from config import db
from datetime import datetime, timezone
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import Enum

class User(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(80), nullable=False)
    branch_id = db.Column(db.Integer, nullable=False)
    is_bec_member = db.Column(db.String(80), nullable=True, default='no')
    bec_position = db.Column(db.String(80), nullable=True, default='no')
    nec_position = db.Column(db.String(80), nullable=False, default='N/A')  # Add this line
    status = db.Column(db.String(80), nullable=False, default='active')
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_json(self):
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
    province = db.Column(Enum('Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape', 'draft', name='branch_province'), nullable=False, default='draft')
    member_count = db.Column(db.Integer, primary_key=False)
    alumni_count = db.Column(db.Integer, primary_key=False)

    def to_json(self):
        return{"id": self.id,
                "name": self.name,
                "university": self.university,
                "province": str(self.province),
                "member_count": self.member_count,
                "alumni": self.alumni
                }

class Alumni(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=False, nullable=False)
    branch_id = db.Column(db.Integer, db.ForeignKey('branche.id'), primary_key=False, nullable=False)
    graduation_date = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    degree = db.Column(db.String(80), unique=False, nullable=False)
    current_status = db.Column(Enum('active', 'cancelled', 'completed', 'draft', name='event_status'), nullable=False, default='draft')

    def to_json(self):
        return{"id": self.id,
                "user_id": self.user_id,
                "branch_id": self.branch_id,
                "graduation_date": self.graduation_date,
                "degree": self.degree,
                "current_status": self.current_status,
                }

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=False, nullable=False)
    date = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    branch_id = db.Column(db.Integer, db.ForeignKey('branche.id'), primary_key=False, nullable=False)
    created_by =  db.Column(db.String(80), unique=False, nullable=False)
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
    title = db.Column(db.String(80), unique=False, nullable=False)
    content = db.Column(db.String(80), unique=False, nullable=False)
    branch_id = db.Column(db.Integer, db.ForeignKey('branche.id'), primary_key=False, nullable=False)
    author_id = db.Column(db.String(120), unique=False, nullable=False)
    publish_date = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    def to_json(self):
        return{"id": self.id,
                "title": self.title,
                "content": self.content,
                "branch_id": self.branch_id,
                "author_id": self.author_id,
                "publish_date": self.publish_date,
                }