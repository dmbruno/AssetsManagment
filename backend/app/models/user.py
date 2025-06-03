# models/user.py (o donde tengas el modelo)
from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(64), nullable=False)
    apellido = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    telefono_celular = db.Column(db.String(20), nullable=True)
    password_hash = db.Column(db.Text, nullable=False)

    assets = db.relationship(
        'Asset',
        backref='user',
        lazy=True,
        cascade='all, delete-orphan',
        passive_deletes=True
    )

    transactions = db.relationship(
        'Transaction',
        backref='user',
        lazy=True,
        cascade='all, delete-orphan',
        passive_deletes=True
    )

    def serialize(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'apellido': self.apellido,
            'email': self.email,
            'telefono_celular': self.telefono_celular
        }
        
        # En el modelo User:
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)