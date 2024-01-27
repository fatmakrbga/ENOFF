from flask import Flask, flash, jsonify, render_template, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from threading import Thread
import time, re
from flask_migrate import Migrate
import random
import string

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:3777@localhost/ENOFFDb'
app.config['SECRET_KEY'] = 'your_secret_key'
db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'loginSign'
migrate = Migrate(app, db)

class kullanici(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    ad = db.Column(db.String(255))
    soyad = db.Column(db.String(255))
    telefon = db.Column(db.String(255))
    mail = db.Column(db.String(255))
    sifre = db.Column(db.String(255))
    adres = db.Column(db.String(255))
    kt = db.Column(db.Integer)
    rol = db.Column(db.String(255))

class Ev(db.Model):
    __tablename__ = 'ev'
    id = db.Column(db.Integer, primary_key=True)
    ad = db.Column(db.String(255))
    oda = db.Column(db.Integer)

class Kullaniciev(db.Model):
    __tablename__ = 'kullaniciev'
    id = db.Column(db.Integer, primary_key=True)
    kullanici_id = db.Column(db.Integer, db.ForeignKey('kullanici.id'))
    ev_id = db.Column(db.Integer, db.ForeignKey('ev.id'))

class Okul(db.Model):
    __tablename__ = 'okul'
    id = db.Column(db.Integer, primary_key=True)
    ad = db.Column(db.String(255))
    fad = db.Column(db.String(255))
    bad = db.Column(db.String(255))
    kat = db.Column(db.Integer)
    adres = db.Column(db.String(255))

class Kullaniciokul(db.Model):
    __tablename__ = 'kullaniciokul'
    id = db.Column(db.Integer, primary_key=True)
    kullanici_id = db.Column(db.Integer, db.ForeignKey('kullanici.id'))
    okul_id = db.Column(db.Integer, db.ForeignKey('okul.id'))

class Kurum(db.Model):
    __tablename__ = 'kurum'
    id = db.Column(db.Integer, primary_key=True)
    ad = db.Column(db.String(255))
    kno = db.Column(db.Integer)
    adres = db.Column(db.String(255))

class Kullanicikurum(db.Model):
    __tablename__ = 'kullanicikurum'
    id = db.Column(db.Integer, primary_key=True)
    kullanici_id = db.Column(db.Integer, db.ForeignKey('kullanici.id'))
    kurum_id = db.Column(db.Integer, db.ForeignKey('kurum.id'))

class Rol(db.Model):
    __tablename__ = 'rol'
    id = db.Column(db.Integer, primary_key=True)
    rol_ad = db.Column(db.String(255))

class Kullanicirol(db.Model):
    __tablename__ = 'kullanicirol'
    id = db.Column(db.Integer, primary_key=True)
    kullanici_id = db.Column(db.Integer, db.ForeignKey('kullanici.id'))
    rol_id = db.Column(db.Integer, db.ForeignKey('rol.id'))
    is_active = db.Column(db.Boolean)

class Kullanicicihaz(db.Model):
    __tablename__ = 'kullanicicihaz'
    id = db.Column(db.Integer, primary_key=True)
    kullanici_id = db.Column(db.Integer, db.ForeignKey('kullanici.id'))
    ad = db.Column(db.String(255))
    serino = db.Column(db.String(255))
    is_active = db.Column(db.Boolean, default=True)  # Bu satırı ekleyin
    ev_id = db.Column(db.Integer, db.ForeignKey('ev.id'))

class Tuketim(db.Model):
    __tablename__ = 'tuketim'
    id = db.Column(db.Integer, primary_key=True)
    kullanici_id = db.Column(db.Integer, db.ForeignKey('kullanici.id'))
    baslangic_tarihi = db.Column(db.TIMESTAMP)
    bitis_tarihi = db.Column(db.TIMESTAMP)
    elektrik_fatura = db.Column(db.Integer)
    bilgilendirme = db.Column(db.String(255))
    toplam_sonuc = db.Column(db.Integer)

class SensorData(db.Model):
    __tablename__ = 'sensor_data'
    id = db.Column(db.Integer, primary_key=True)
    kullanici_id = db.Column(db.Integer, db.ForeignKey('kullanici.id'))
    data = db.Column(db.Float)
    timestamp = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())

class Pin(db.Model):
    __tablename__ = 'pin'
    id = db.Column(db.Integer, primary_key=True)
    serino = db.Column(db.String(255))  # Cihazın seri numarası
    pinno = db.Column(db.Integer)

class Kullanicipin(db.Model):
    __tablename__ = 'kullanicipin'
    id = db.Column(db.Integer, primary_key=True)    
    kullanici_id = db.Column(db.Integer, db.ForeignKey('kullanici.id'))
    pin_id = db.Column(db.Integer, db.ForeignKey('pin.id'))

@login_manager.user_loader
def load_user(user_id):
    #return kullanici.query.get(int(user_id))
    return db.session.get(kullanici, int(user_id))

@app.route('/dashboard_ev.html')
@login_required
def dashboard_ev():
    kullanici_evs = (db.session.query(Kullaniciev, Ev)
                     .filter(Kullaniciev.kullanici_id == current_user.id)
                     .join(Ev, Kullaniciev.ev_id == Ev.id)
                     .all())
    return render_template('dashboard_ev.html', kullanici_evs=kullanici_evs, user=current_user)

# @app.route('/ev_ekle', methods=['GET', 'POST'])
# @login_required
# def ev_ekle():
#     if request.method == 'POST':
#         Ev_adi = request.form.get('ad')
#         oda_sayisi = request.form.get('oda')

#         yeni_ev = Ev(ad=Ev_adi, oda=oda_sayisi)
#         db.session.add(yeni_ev)
#         db.session.commit()

#         kullanici_ev = Kullaniciev(kullanici_id=current_user.id, ev_id=yeni_ev.id)
#         db.session.add(kullanici_ev)
#         db.session.commit()

#         # İşlem tamamlandıktan sonra dashboard_ev.html sayfasına yönlendir
#         return redirect(url_for('dashboard_ev'))
    
#     # GET requesti için formu göster
#     return render_template('dashboard_ev.html')


@app.route('/ev_ekle', methods=['GET', 'POST'])
@login_required
def ev_ekle():
    if request.method == 'POST':
        Ev_adi = request.form.get('ad')
        oda_sayisi = request.form.get('oda')

        # 'oda' alanının bir sayı olduğunu doğrula
        if not re.match('^[0-9]+$', oda_sayisi):
            flash('Oda sayısı bir sayı olmalıdır.')
            return redirect(url_for('dashboard_ev'))

        yeni_ev = Ev(ad=Ev_adi, oda=int(oda_sayisi))
        db.session.add(yeni_ev)
        db.session.commit()

        kullanici_ev = Kullaniciev(kullanici_id=current_user.id, ev_id=yeni_ev.id)
        db.session.add(kullanici_ev)
        db.session.commit()

        return redirect(url_for('dashboard_ev'))

    return render_template('dashboard_ev.html')


@app.route('/add_user_with_home', methods=['POST'])
def add_user_with_home():
    ad = request.form['ad']
    soyad = request.form['soyad']
    mail = request.form['mail']
    sifre = request.form['sifre']
    secilen_ev_id = request.form['secilenEvId']

    if not secilen_ev_id:
        flash('Lütfen bir ev seçiniz.')
        return redirect(url_for('dashboard_ev'))

    yeni_kullanici = kullanici(ad=ad, soyad=soyad, mail=mail, sifre=sifre, rol='kullanici')
    db.session.add(yeni_kullanici)
    db.session.flush()  # Kullanıcının ID'sini alabilmek için

    # Eklenen kullanıcının ID'sini al
    kullanici_id = yeni_kullanici.id

    # Kullanıcıyı evle ilişkilendirme işlemi
    kullaniciev_kayit = Kullaniciev(kullanici_id=kullanici_id, ev_id=secilen_ev_id)
    db.session.add(kullaniciev_kayit)
    db.session.commit()

    return redirect(url_for('dashboard_ev')) 

@app.route('/listele_kullanicilar', methods=['POST'])
def listele_kullanicilar():
    secilen_ev_id = request.form['secilenEvId']
    users = (db.session.query(kullanici)
             .join(Kullaniciev, kullanici.id == Kullaniciev.kullanici_id)
             .filter(kullanici.rol == 'kullanici', Kullaniciev.ev_id == secilen_ev_id)
             .all())
    print(users)  # Log the users to the console
    return render_template('_kullanici_listesi.html', users=users)

#EV SİL
@app.route('/ev_sil/<int:ev_id>', methods=['GET', 'POST'])
@login_required
def ev_sil(ev_id):
    # İlk olarak, bu eve bağlı olan Kullaniciev kayıtlarını bul
    kullaniciev_kayitlari = Kullaniciev.query.filter_by(ev_id=ev_id).all()

    # Kullaniciev kayıtlarını sil ve kullanıcı ID'lerini sakla
    kullanici_idleri = set()
    for kayit in kullaniciev_kayitlari:
        kullanici_idleri.add(kayit.kullanici_id)
        db.session.delete(kayit)

    # Veritabanı değişikliklerini kaydet
    db.session.commit()

    # İlgili kullanıcıları sil
    for kullanici_id in kullanici_idleri:
        # İlgili kullanıcıya bağlı tüm Kullaniciev kayıtlarını kontrol et
        if not Kullaniciev.query.filter_by(kullanici_id=kullanici_id).first():
            kullanicil = db.session.get(kullanici, kullanici_id)
            if kullanicil:
                db.session.delete(kullanicil)

    # Veritabanı değişikliklerini tekrar kaydet
    db.session.commit()

    # Ev kaydını bul ve sil
    silinecek_ev = db.session.get(Ev, ev_id)
    if silinecek_ev:
        db.session.delete(silinecek_ev)
        db.session.commit()
        return jsonify({"message": "Ev ve ilişkili tüm kayıtlar başarıyla silindi.", "status": "success"})
    else:
        return jsonify({"message": "Ev bulunamadı.", "status": "error"})

    # İşlem tamamlandıktan sonra dashboard_ev.html sayfasına yönlendir
    return redirect(url_for('dashboard_ev'))

@app.route('/kullanici_sil/<int:user_id>', methods=['POST'])
@login_required
def kullanici_sil(user_id):
    # İlk olarak, ilgili Kullaniciev kayıtlarını bul ve sil
    Kullaniciev.query.filter_by(kullanici_id=user_id).delete()

    # Sonra, Kullanıcıyı bul ve sil
    kullanicii = kullanici.query.get_or_404(user_id)  # Burada düzeltme yapıldı
    db.session.delete(kullanicii)

    # Veritabanı değişikliklerini kaydet
    db.session.commit()

    return jsonify({'message': 'Kullanıcı ve ilişkili kayıtlar başarıyla silindi'})

@app.route('/dashboard_isletme.html')
@login_required
def dashboard_isletme():
    kullanici_kurums = (db.session.query(Kullanicikurum, Kurum)
                      .filter(Kullanicikurum.kullanici_id == current_user.id)
                      .join(Kurum, Kullanicikurum.kurum_id == Kurum.id)
                      .all())
    return render_template('dashboard_isletme.html', kullanici_kurums=kullanici_kurums, user=current_user)

@app.route('/kurum_ekle', methods=['GET', 'POST'])
@login_required
def kurum_ekle():
    if request.method == 'POST':
        kurum_adi = request.form.get('KurumAdi')
        kurum_no = request.form.get('KurumNo')
        adres = request.form.get('adres')

        # Kurum numarasının sayısal bir değer olduğunu doğrulayın
        if not kurum_no.isdigit():
            flash('Kurum numarası sayısal bir değer olmalıdır.')
            return redirect(url_for('dashboard_isletme'))

        yeni_kurum = Kurum(ad=kurum_adi, kno=int(kurum_no), adres=adres)
        db.session.add(yeni_kurum)
        db.session.commit()

        kullanici_kurum = Kullanicikurum(kullanici_id=current_user.id, kurum_id=yeni_kurum.id)
        db.session.add(kullanici_kurum)
        db.session.commit()

        return redirect(url_for('dashboard_isletme'))

    return render_template('dashboard_isletme.html')

@app.route('/add_user_with_kurum', methods=['POST'])
def add_user_with_kurum():
    ad = request.form['ad']
    soyad = request.form['soyad']
    mail = request.form['mail']
    sifre = request.form['sifre']
    secilen_kurum_id = request.form['secilenKurumId']

    if not secilen_kurum_id:
        flash('Lütfen bir kurum seçiniz.')
        return redirect(url_for('dashboard_isletme'))

    yeni_kullanici = kullanici(ad=ad, soyad=soyad, mail=mail, sifre=sifre, rol='kullanici')
    db.session.add(yeni_kullanici)
    db.session.flush()  # Kullanıcının ID'sini alabilmek için

    # Eklenen kullanıcının ID'sini al
    kullanici_id = yeni_kullanici.id

    # Kullanıcıyı kurumla ilişkilendirme işlemi
    kullanicikurum_kayit = Kullanicikurum(kullanici_id=kullanici_id, kurum_id=secilen_kurum_id)
    db.session.add(kullanicikurum_kayit)
    db.session.commit()

    return redirect(url_for('dashboard_isletme')) 

@app.route('/listele_kullanicilar1', methods=['POST'])
def listele_kullanicilar1():
    secilen_kurum_id = request.form['secilenKurumId']
    users = (db.session.query(kullanici)
             .join(Kullanicikurum, kullanici.id == Kullanicikurum.kullanici_id)
             .filter(kullanici.rol == 'kullanici', Kullanicikurum.kurum_id == secilen_kurum_id)
             .all())
    print(users)  # Log the users to the console
    return render_template('_kullanici_listesi1.html', users=users)

#KURUM SİL
@app.route('/kurum_sil/<int:kurum_id>', methods=['GET', 'POST'])
@login_required
def kurum_sil(kurum_id):
    # İlk olarak, bu eve bağlı olan Kullaniciev kayıtlarını bul
    kullanicikurum_kayitlari = Kullanicikurum.query.filter_by(kurum_id=kurum_id).all()

    # Kullaniciev kayıtlarını sil ve kullanıcı ID'lerini sakla
    kullanici_idleri = set()
    for kayit in kullanicikurum_kayitlari:
        kullanici_idleri.add(kayit.kullanici_id)
        db.session.delete(kayit)

    # Veritabanı değişikliklerini kaydet
    db.session.commit()

    # İlgili kullanıcıları sil
    for kullanici_id in kullanici_idleri:
        # İlgili kullanıcıya bağlı tüm Kullaniciev kayıtlarını kontrol et
        if not Kullanicikurum.query.filter_by(kullanici_id=kullanici_id).first():
            kullanicil = db.session.get(kullanici, kullanici_id)
            if kullanicil:
                db.session.delete(kullanicil)

    # Veritabanı değişikliklerini tekrar kaydet
    db.session.commit()

    # Ev kaydını bul ve sil
    silinecek_kurum = db.session.get(Kurum, kurum_id)
    if silinecek_kurum:
        db.session.delete(silinecek_kurum)
        db.session.commit()
        return jsonify({"message": "Kurum ve ilişkili tüm kayıtlar başarıyla silindi.", "status": "success"})
    else:
        return jsonify({"message": "Kurum bulunamadı.", "status": "error"})

    # İşlem tamamlandıktan sonra dashboard_ev.html sayfasına yönlendir
    return redirect(url_for('dashboard_isletme'))

@app.route('/kullanici_sil1/<int:user_id>', methods=['POST'])
@login_required
def kullanici_sil1(user_id):
    # İlk olarak, ilgili Kullaniciev kayıtlarını bul ve sil
    Kullanicikurum.query.filter_by(kullanici_id=user_id).delete()

    # Sonra, Kullanıcıyı bul ve sil
    kullanicii = kullanici.query.get_or_404(user_id)  # Burada düzeltme yapıldı
    db.session.delete(kullanicii)

    # Veritabanı değişikliklerini kaydet
    db.session.commit()

    return jsonify({'message': 'Kullanıcı ve ilişkili kayıtlar başarıyla silindi'})

#OKUL

@app.route('/dashboard_okul.html')
@login_required
def dashboard_okul():
    kullanici_okuls = (db.session.query(Kullaniciokul, Okul)
                      .filter(Kullaniciokul.kullanici_id == current_user.id)
                      .join(Okul, Kullaniciokul.okul_id == Okul.id)
                      .all())
    return render_template('dashboard_okul.html', kullanici_okuls=kullanici_okuls, user=current_user)

@app.route('/okul_ekle', methods=['GET', 'POST'])
@login_required
def okul_ekle():
    if request.method == 'POST':
        okul_adi = request.form.get('OkulAdi')
        fakulte_adi = request.form.get('FakulteAdi')
        bolum_adi = request.form.get('BolumAdi')
        kat_bilgi = request.form.get('KatBilgi')
        adres = request.form.get('adres')

        # Validate that 'kat_bilgi' is a numeric value
        if not kat_bilgi.isdigit():
            flash('Kat bilgisi sayısal bir değer olmalıdır.')
            return redirect(url_for('dashboard_okul'))

        # Create a new Okul instance
        yeni_okul = Okul(ad=okul_adi, fad=fakulte_adi, bad=bolum_adi, kat=int(kat_bilgi), adres=adres)
        db.session.add(yeni_okul)
        db.session.commit()

        # Create a new Kullaniciokul instance
        kullanici_okul = Kullaniciokul(kullanici_id=current_user.id, okul_id=yeni_okul.id)
        db.session.add(kullanici_okul)
        db.session.commit()

        return redirect(url_for('dashboard_okul'))

    return render_template('dashboard_okul.html')

@app.route('/add_user_with_okul', methods=['POST'])
def add_user_with_okul():
    ad = request.form['ad']
    soyad = request.form['soyad']
    mail = request.form['mail']
    sifre = request.form['sifre']
    secilen_okul_id = request.form['secilenOkulId']

    if not secilen_okul_id:
        flash('Lütfen bir okul seçiniz.')
        return redirect(url_for('dashboard_okul'))

    yeni_kullanici = kullanici(ad=ad, soyad=soyad, mail=mail, sifre=sifre, rol='kullanici')
    db.session.add(yeni_kullanici)
    db.session.flush()  # Kullanıcının ID'sini alabilmek için

    # Eklenen kullanıcının ID'sini al
    kullanici_id = yeni_kullanici.id

    # Kullanıcıyı okulla ilişkilendirme işlemi
    kullaniciokul_kayit = Kullaniciokul(kullanici_id=kullanici_id, okul_id=secilen_okul_id)
    db.session.add(kullaniciokul_kayit)
    db.session.commit()

    return redirect(url_for('dashboard_okul')) 

@app.route('/listele_kullanicilar2', methods=['POST'])
def listele_kullanicilar2():
    secilen_okul_id = request.form['secilenOkulId']
    users = (db.session.query(kullanici)
             .join(Kullaniciokul, kullanici.id == Kullaniciokul.kullanici_id)
             .filter(kullanici.rol == 'kullanici', Kullaniciokul.okul_id == secilen_okul_id)
             .all())
    print(users)  # Log the users to the console
    return render_template('_kullanici_listesi2.html', users=users)

#KURUM SİL
@app.route('/okul_sil/<int:okul_id>', methods=['GET', 'POST'])
@login_required
def okul_sil(okul_id):
    # İlk olarak, bu eve bağlı olan Kullaniciev kayıtlarını bul
    kullaniciokul_kayitlari = Kullaniciokul.query.filter_by(okul_id=okul_id).all()

    # Kullaniciev kayıtlarını sil ve kullanıcı ID'lerini sakla
    kullanici_idleri = set()
    for kayit in kullaniciokul_kayitlari:
        kullanici_idleri.add(kayit.kullanici_id)
        db.session.delete(kayit)

    # Veritabanı değişikliklerini kaydet
    db.session.commit()

    # İlgili kullanıcıları sil
    for kullanici_id in kullanici_idleri:
        # İlgili kullanıcıya bağlı tüm Kullaniciev kayıtlarını kontrol et
        if not Kullaniciokul.query.filter_by(kullanici_id=kullanici_id).first():
            kullanicil = db.session.get(kullanici, kullanici_id)
            if kullanicil:
                db.session.delete(kullanicil)

    # Veritabanı değişikliklerini tekrar kaydet
    db.session.commit()

    # Ev kaydını bul ve sil
    silinecek_okul = db.session.get(Okul, okul_id)
    if silinecek_okul:
        db.session.delete(silinecek_okul)
        db.session.commit()
        return jsonify({"message": "Kurum ve ilişkili tüm kayıtlar başarıyla silindi.", "status": "success"})
    else:
        return jsonify({"message": "Kurum bulunamadı.", "status": "error"})

    # İşlem tamamlandıktan sonra dashboard_ev.html sayfasına yönlendir
    return redirect(url_for('dashboard_okul'))

@app.route('/kullanici_sil2/<int:user_id>', methods=['POST'])
@login_required
def kullanici_sil2(user_id):
    # İlk olarak, ilgili Kullaniciev kayıtlarını bul ve sil
    Kullaniciokul.query.filter_by(kullanici_id=user_id).delete()

    # Sonra, Kullanıcıyı bul ve sil
    kullanicii = kullanici.query.get_or_404(user_id)  # Burada düzeltme yapıldı
    db.session.delete(kullanicii)

    # Veritabanı değişikliklerini kaydet
    db.session.commit()

    return jsonify({'message': 'Kullanıcı ve ilişkili kayıtlar başarıyla silindi'})


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index4'))  # index-4.html sayfasına yönlendir

@app.route('/submit_user', methods=['POST'])
def submit_user():
    ad = request.form['ad']
    soyad = request.form['soyad']
    mail = request.form['mail']
    sifre = request.form['sifre']
    telefon = request.form['telefon']
    adres = request.form['adres']
    kt = request.form.get('kt')  # kt değerini alın
    rol = request.form.get('rol')

    yeni_kullanici = kullanici(ad=ad, soyad=soyad, mail=mail, sifre=sifre, telefon=telefon, adres=adres, kt=kt, rol=rol)
    
    db.session.add(yeni_kullanici)
    db.session.commit()

    # AJAX isteği için JSON yanıtı döndür
    return redirect(url_for('loginSign'))

@app.route('/')
def home():
    return render_template('index-4.html')

@app.route('/index-4.html')
def index4():
    return render_template('index-4.html')

@app.route('/about.html')
def about():
    return render_template('about.html')

@app.route('/isletme.html')
def isletme():
    return render_template('isletme.html')

@app.route('/okul.html')
def okul():
    return render_template('okul.html')

@app.route('/ev.html')
def ev():
    return render_template('ev.html')

@app.route('/loginSign.html', methods=['GET', 'POST'])
def loginSign():
    if request.method == 'POST':
        mail = request.form['mail']
        sifre = request.form['sifre']

        User = kullanici.query.filter_by(mail=mail, sifre=sifre).first()

        if User:
            login_user(User)
            return redirect(url_for('dashboard_profil'))
        else:
            error = 'Geçersiz kullanıcı adı veya şifre'
            return render_template('loginSign.html', error=error)

    return render_template('loginSign.html')

#NodeMCU 

# Verileri saklamak için bir liste
sensor_data = []
sums = []  # Her 24 veri öğesi için toplamları saklamak için bir liste
grand_total = 0  # 30 döngünün genel toplamı
MAX_COUNT = 24  # Her turda toplanacak veri sayısı
MAX_CYCLES = 30  # Maksimum tur sayısı

@app.route('/node-data.html')
def node_data():
    # 'node-data.html' sayfasını render et
    return render_template('node-data.html')

priz_durumu = 0

@app.route('/toggle-power', methods=['POST'])
def toggle_power():
    global priz_durumu
    # İstekten yeni durumu al
    new_state = request.json.get('state')
    # Global priz durumunu güncelle
    priz_durumu = new_state
    print("toggle-power called with state:", new_state)
    # Güncellenen priz durumunu döndür
    return jsonify({"power": priz_durumu}), 200

@app.route('/post-data', methods=['POST'])
def post_data():
    global grand_total, priz_durumu
    # ESP8266'dan gelen veriyi al
    data = request.form.get('sensorData')

    # Alınan veriyi ve mevcut priz durumunu logla
    print("Alınan sensör verisi: ", data)
    print("Mevcut priz durumu (priz_durumu): ", priz_durumu)

    if data:
        sensor_data.append(float(data))  # Veriyi float olarak sakla
        if len(sensor_data) == MAX_COUNT:
            sum_value = sum(sensor_data)
            sums.append(sum_value)
            grand_total += sum_value
            del sensor_data[:]  # Listeyi sıfırla

            if len(sums) == MAX_CYCLES:
                response = jsonify({"total": grand_total, "cycles": sums})
                grand_total = 0  # Genel toplamı sıfırla
                del sums[:]  # Toplamları saklayan listeyi sıfırla
                return response
        return str(priz_durumu), 200
    return "Veri yok", 400

@app.route('/get-data')
def get_data():
    # Saklanan toplamları ve genel toplamı döndür
    return jsonify({"total": grand_total, "cycles": sums})

@app.route('/get-control-data')
def get_control_data():
    # Eğer toplamlar listesi boş değilse, en son toplam değerini içeren bir JSON yanıtı döndür
    if sums:
        return jsonify({"energy": sums})
    else:
        # Eğer toplamlar listesi boşsa, boş bir liste döndür
        return jsonify({"energy": []})

@app.route('/control.html')
@login_required
def control():
    # Şu an giriş yapmış olan kullanıcının cihazlarını al
    urunler = Kullanicicihaz.query.filter_by(kullanici_id=current_user.id, is_active=True).all()

    # İlişkili ev bilgilerini al
    urunler_ve_evler = []
    for urun in urunler:
        ev = Ev.query.get(urun.ev_id)
        urunler_ve_evler.append({
            'ad': urun.ad,
            'serino': urun.serino,
            'ev_ad': ev.ad if ev else 'Belirtilmemiş'
        })

    houses = get_current_user_houses2()
    user_sensor_data = SensorData.query.filter_by(kullanici_id=current_user.id).all()
    return render_template('control.html', sensor_data=user_sensor_data, houses=houses)

def get_current_user_houses2():
    current_user_id = current_user.id

    # Kullanıcıya ait ev kayıtlarını ve ilişkili ev adlarını sorgula
    user_houses = db.session.query(Kullaniciev, Ev).filter(Kullaniciev.kullanici_id == current_user_id).join(Ev, Kullaniciev.ev_id == Ev.id).all()

    # Her ev için ad ve ID içeren bir sözlük döndür
    return [{'id': house.Ev.id, 'ad': house.Ev.ad} for house in user_houses]

@app.route('/get_users/<int:house_id>')
def get_users(house_id):
    kullanici_evler = Kullaniciev.query.filter_by(ev_id=house_id).all()
    kullanici_ids = [ke.kullanici_id for ke in kullanici_evler]
    kullanici_list = kullanici.query.filter(kullanici.id.in_(kullanici_ids)).all()  # Kullanici modelinin adı düzeltilmeli
    return jsonify([{'id': k.id, 'ad': k.ad} for k in kullanici_list])

@app.route('/air-conditioning.html')
def air_conditioning():
    return render_template('air-conditioning.html')

@app.route('/heating-service.html')
def heating_service():
    return render_template('heating-service.html')

@app.route('/power-outlets.html')
def power_outlets():
    return render_template('power-outlets.html')

@app.route('/indoor-lighting.html')
def indoor_lighting():
    return render_template('indoor-lighting.html')

@app.route('/security-system.html')
def security_system():
    return render_template('security-system.html')

@app.route('/electrical-panels.html')
def electrical_panels():
    return render_template('electrical-panels.html')

@app.route('/team.html')
def team():
    return render_template('team.html')

@app.route('/team-2.html')
def team2():
    return render_template('team-2.html')

@app.route('/team-details.html')
def team_details():
    return render_template('team-details.html')

@app.route('/project.html')
def project():
    return render_template('project.html')

@app.route('/contact.html')
def iletisim():
    return render_template('contact.html')

@app.route('/izleme.html')
def izleme():
    return render_template('izleme.html')

@app.route('/dashboard_urun.html')
@login_required
def dashboard_urun():
    return render_template('dashboard_urun.html', user=current_user)

@app.route('/dashboard_profil.html')
@login_required
def dashboard_profil():
    return render_template('dashboard_profil.html', user=current_user)

@app.route('/dashboard_gizlilik.html')
@login_required
def dashboard_gizlilik():
    return render_template('dashboard_gizlilik.html', user=current_user)

@app.route('/add-product', methods=['POST'])
@login_required
def add_product():
    if 'chosenHouseId' not in request.form or not request.form['chosenHouseId']:
        flash('Lütfen ev seçiniz', 'warning')
        return redirect(url_for('dashboard_cihaz'))

    ad = request.form['ProductName']
    ev_id = request.form['chosenHouseId']  # Seçilen evin ID'si
    
    # Aynı cihaz tipinin o evde zaten olup olmadığını kontrol et
    mevcut_cihaz = Kullanicicihaz.query.filter_by(ad=ad, ev_id=ev_id).first()
    if mevcut_cihaz:
        clean_message = f'{ad} bu eve zaten eklenmiş.'.replace('\n', ' ').strip()
        return jsonify({'message': clean_message}), 409

    # Cihaz tipine göre sabit seri numarası belirle
    serino_mapping = {'Cihaz 1': '1', 'Cihaz 2': '2', 'Cihaz 3': '3', 'Cihaz 4': '4'}
    serino = serino_mapping.get(ad, '0')  # Bilinmeyen bir cihaz ise '0'

    kullanici_id = current_user.id

    yeni_kullanici_cihaz = Kullanicicihaz(
        kullanici_id=kullanici_id,
        ad=ad,
        serino=serino,
        is_active=True,
        ev_id=ev_id
    )
    db.session.add(yeni_kullanici_cihaz)
    db.session.flush()  # Bu, yeni eklenen cihazın ID'sini almak için gereklidir

    # Cihaz tipine göre pin sayısı belirle ve Pin oluştur
    pin_sayisi_mapping = {'Cihaz 1': 5, 'Cihaz 2': 10, 'Cihaz 3': 30, 'Cihaz 4': 60}
    pin_sayisi = pin_sayisi_mapping.get(ad, 0)

    # Seçilen eve ait tüm kullanıcıları al (current_user hariç)
    ev_kullanicilari = Kullaniciev.query.filter(Kullaniciev.ev_id == ev_id, Kullaniciev.kullanici_id != current_user.id).all()
    ev_kullanici_idleri = [ke.kullanici_id for ke in ev_kullanicilari]

    for i in range(1, pin_sayisi + 1):
        yeni_pin = Pin(serino=serino, pinno=i)
        db.session.add(yeni_pin)
        db.session.flush()  # Yeni eklenen pin'in ID'sini almak için

        # İlk pin için şu anki kullanıcıyı atayın
        if i == 1:
            kullanici_pin = Kullanicipin(
                kullanici_id=current_user.id,
                pin_id=yeni_pin.id
            )
            db.session.add(kullanici_pin)
        elif i <= len(ev_kullanici_idleri) + 1:
            # Diğer pinler için evdeki diğer kullanıcıları sırasıyla atayın
            kullanici_pin = Kullanicipin(
                kullanici_id=ev_kullanici_idleri[i - 2],  # -2 çünkü ilk pin current_user'a ait ve index 0'dan başlıyor
                pin_id=yeni_pin.id
            )
            db.session.add(kullanici_pin)

    db.session.commit()

    return '', 204

@app.route('/dashboard_cihaz.html')
@login_required
def dashboard_cihaz():
    # Şu an giriş yapmış olan kullanıcının cihazlarını al
    urunler = Kullanicicihaz.query.filter_by(kullanici_id=current_user.id, is_active=True).all()

    # İlişkili ev bilgilerini al
    urunler_ve_evler = []
    for urun in urunler:
        ev = Ev.query.get(urun.ev_id)
        urunler_ve_evler.append({
            'ad': urun.ad,
            'serino': urun.serino,
            'ev_ad': ev.ad if ev else 'Belirtilmemiş'
        })

    houses = get_current_user_houses()
    return render_template('dashboard_cihaz.html', user=current_user, urunler=urunler_ve_evler, houses=houses)


def get_current_user_houses():
    current_user_id = current_user.id

    # Kullanıcıya ait ev kayıtlarını ve ilişkili ev adlarını sorgula
    user_houses = db.session.query(Kullaniciev, Ev).filter(Kullaniciev.kullanici_id == current_user_id).join(Ev, Kullaniciev.ev_id == Ev.id).all()

    # Her ev için ad ve ID içeren bir sözlük döndür
    return [{'id': house.Ev.id, 'ad': house.Ev.ad} for house in user_houses]

@app.route('/delete-product', methods=['POST'])
@login_required
def delete_product():
    serino = request.form['SerialNumber']
    
    # Seri numarasına göre cihazı bul ve sil
    cihaz = Kullanicicihaz.query.filter_by(serino=serino).first()
    if cihaz:
        db.session.delete(cihaz)

        # Seri numarasına bağlı tüm Pin kayıtlarını sil
        Pin.query.filter_by(serino=serino).delete()

        db.session.commit()
        return '', 204
    else:
        return jsonify({'message': 'Cihaz bulunamadı'}), 404


# def get_current_user_houses():
#     current_user_id = current_user.id

#     # Kullanıcıya ait ev kayıtlarını ve ilişkili ev adlarını sorgula
#     user_houses = db.session.query(Kullaniciev, Ev).filter(Kullaniciev.kullanici_id == current_user_id).join(Ev, Kullaniciev.ev_id == Ev.id).all()

#     # Ev adlarını döndür
#     return [house.Ev.ad for house in user_houses]

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5001, debug=True)  # Bu uygulama 5001 portunda çalışacaktır
