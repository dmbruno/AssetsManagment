from app import db
from datetime import datetime

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    asset_id = db.Column(
        db.Integer,
        db.ForeignKey('asset.id', ondelete='CASCADE'),
        nullable=False
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey('user.id', ondelete='CASCADE'),
        nullable=False
    )

    date = db.Column(db.Date, nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    price = db.Column(db.Float, nullable=False)
    type = db.Column(db.String(4), nullable=False)  # "buy" o "sell"

    def serialize(self):
        return {
            'id': self.id,
            'asset_id': self.asset_id,
            'user_id': self.user_id,
            'type': self.type,
            'quantity': self.quantity,
            'price': self.price,
            'date': self.date.isoformat()
        }