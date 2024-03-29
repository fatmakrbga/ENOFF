"""ev

Revision ID: 9417d341c51d
Revises: 002911249fb0
Create Date: 2024-01-10 21:48:44.502605

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9417d341c51d'
down_revision = '002911249fb0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('ev',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ad', sa.String(length=255), nullable=True),
    sa.Column('oda', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('ev')
    # ### end Alembic commands ###
