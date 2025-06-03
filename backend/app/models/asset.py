from app import db

class Asset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    symbol = db.Column(db.String(10), nullable=False)
    type = db.Column(db.String(20), nullable=False)  # stock, crypto, bond, etc.
    current_price = db.Column(db.Float, nullable=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey('user.id', ondelete='CASCADE'),
        nullable=False
    )

    transactions = db.relationship(
        'Transaction',
        backref='asset',
        lazy=True,
        cascade='all, delete-orphan',
        passive_deletes=True
    )

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'symbol': self.symbol,
            'type': self.type,
            'user_id': self.user_id,
            'current_price': self.current_price
        }