from config import db
from datetime import datetime, timezone
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import Enum

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(Enum('admin', 'nec', 'bec', 'member', 'alumni', name='user_roles', native_enum=False), nullable=False, default='member')
    branch_id = db.Column(db.Integer, db.ForeignKey('branche.id'), nullable=True)
    is_bec_member = db.Column(db.Boolean, default=False, nullable=False)
    nec_position = db.Column(db.String(80), nullable=True)
    bec_position = db.Column(db.String(80), nullable=True)
    status = db.Column(Enum('active', 'inactive', 'graduated', name='user_statuses', native_enum=False), nullable=False, default='active')

      # Method to set the password (automatically hashes it)
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    # Method to check the password
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_json(self, include_password=False):
        return{"id": self.id,
                "name": self.name,
                "email": self.email,
                "role": str(self.role),
                "branch_id": self.branch_id,
                "is_bec_member": str(self.is_bec_member),
                "nec_position": str(self.nec_position),
                "bec_position": str(self.bec_position),
                "status": str(self.status)
                }

class Branche(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name =  db.Column(db.String(80), unique=False, nullable=False)
    university = db.Column(db.String(80), unique=False, nullable=False)
    province = db.Column(Enum('Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape', name='branch_provinces', native_enum=False), nullable=False)
    member_count = db.Column(db.Integer, primary_key=False)
    alumni_count = db.Column(db.Integer, primary_key=False)

    # Relationships
    users = db.relationship('User', backref='branch', lazy=True)
    alumni = db.relationship('Alumni', backref='branch', lazy=True)
    events = db.relationship('Event', backref='branch', lazy=True)
    news = db.relationship('News', backref='branch', lazy=True)

    def to_json(self):
        return{"id": self.id,
                "name": self.name,
                "university": self.university,
                "province": str(self.province),
                "member_count": self.member_count,
                "alumni_count": self.alumni_count
                }

class Alumni(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=False, nullable=False)
    branch_id = db.Column(db.Integer, db.ForeignKey('branche.id'), primary_key=False, nullable=False)
    graduation_date = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    degree = db.Column(db.String(120), unique=False, nullable=False)
    current_status = db.Column(db.String(80), nullable=True) # e.g., 'Employed', 'Further Studies'

    def to_json(self):
        return{"id": self.id,
                "user_id": self.user_id,
                "branch_id": self.branch_id,
                "graduation_date": self.graduation_date,
                "degree": self.degree,
                "current_status": str(self.current_status),
                }

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=False, nullable=False)
    date = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    branch_id = db.Column(db.Integer, db.ForeignKey('branche.id'), primary_key=False, nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_type = db.Column(db.String(120), unique=False, nullable=False)

    def to_json(self):
        return{"id": self.id,
                "title": self.title,
                "date": self.date,
                "branchId": self.branch_id,
                "createdBy": self.created_by,
                "eventType": self.event_type
                }
    
class News(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=False, nullable=False)
    content = db.Column(db.Text, unique=False, nullable=False)
    branch_id = db.Column(db.Integer, db.ForeignKey('branche.id'), primary_key=False, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    publish_date = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    def to_json(self):
        return{"id": self.id,
                "title": self.title,
                "content": self.content,
                "branch_id": self.branch_id,
                "author_id": self.author_id,
                "publish_date": self.publish_date,
                }