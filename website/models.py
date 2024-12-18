from . import db
from flask_login import UserMixin
from datetime import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import Numeric
from sqlalchemy.orm import backref
from datetime import datetime

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    create_time = db.Column(db.Date, default=datetime.now())
    sender = db.Column(db.String(20), default=None)
    text = db.Column(db.String(200))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', backref=backref('messages', lazy=True, cascade="all, delete-orphan"))

class User(db.Model, UserMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(13), default='Респондент')
    email = db.Column(db.String(50), unique=True)
    fio = db.Column(db.String(30))
    telephone = db.Column(db.String(20))
    password = db.Column(db.String(50))
    last_active = db.Column(db.DateTime, nullable=False, default=datetime.now())
    organization_id = db.Column(db.Integer(), db.ForeignKey('organization.id'))
    reports = db.relationship('Report', backref='user', lazy=True, cascade="all, delete-orphan")
    organization = db.relationship('Organization', backref=backref('users', lazy=True, single_parent=True))

    def update_activity(self):
        self.last_active = datetime.now()
        db.session.commit()

class Organization(db.Model):
    __tablename__ = 'organization'
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100))
    okpo = db.Column(db.Integer)
    ynp = db.Column(db.Integer)
    ministry = db.Column(db.String(50)) 
  
class Report(db.Model):
    __tablename__ = 'report'
    id = db.Column(db.Integer, primary_key=True)
    okpo = db.Column(db.Integer)
    organization_name = db.Column(db.String(50))
    year = db.Column(db.Integer)
    quarter = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))  
    time_of_receipt = db.Column(db.Date) 
    versions = relationship('Version_report', backref='report')

class Version_report(db.Model):
    __tablename__ = 'version_report'
    id = db.Column(db.Integer, primary_key=True)
    begin_time = db.Column(db.Date, default=datetime.now())
    change_time = db.Column(db.Date)
    sent_time = db.Column(db.Date)
    audit_time = db.Column(db.Date)
    status = db.Column(db.String(20))
    fio = db.Column(db.String(30))
    telephone = db.Column(db.String(20))    
    email = db.Column(db.String(50))
    hasNot = db.Column(db.Boolean, default=False)
    report_id = db.Column(db.Integer, db.ForeignKey('report.id'))
    sections = db.relationship('Sections', backref='version_report', lazy=True, cascade="all, delete-orphan")

class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    begin_time = db.Column(db.Date, default=datetime.now())
    luck = db.Column(db.Boolean, default=False)
    note = db.Column(db.String(200))
    version_report_id = db.Column(db.Integer, db.ForeignKey('version_report.id'))
    version_report = relationship("Version_report", backref="ticket")

class DirUnit(db.Model):
    __tablename__ = 'DirUnit'
    IdUnit = db.Column(db.Integer, primary_key = True)
    CodeUnit = db.Column(db.String(4000))
    NameUnit = db.Column(db.String(4000))
    
class DirProduct(db.Model):
    __tablename__ = 'DirProduct'
    IdProduct = db.Column(db.Integer, primary_key = True)
    CodeProduct = db.Column(db.String(4000))
    NameProduct = db.Column(db.String(4000))
    IsFuel = db.Column(db.Boolean)
    IsHeat = db.Column(db.Boolean) 
    IsElectro = db.Column(db.Boolean)
    IdUnit = db.Column(db.Integer, db.ForeignKey('DirUnit.IdUnit'))
    DateStart = db.Column(db.Date)
    DateEnd = db.Column(db.Date)
    unit = relationship("DirUnit", foreign_keys=[IdUnit], backref="products")
    
class Sections(db.Model):
    __tablename__ = 'sections'
    id = db.Column(db.Integer, primary_key=True) 
    id_version = db.Column(db.Integer, db.ForeignKey('version_report.id'))
    id_product = db.Column(db.Integer, db.ForeignKey('DirProduct.IdProduct'))
    code_product = db.Column(db.String, db.ForeignKey('DirProduct.CodeProduct'))
    section_number = db.Column(db.Integer)
    Oked = db.Column(db.Integer)
    produced = db.Column(Numeric(precision=20, scale=2))
    Consumed_Quota = db.Column(Numeric(precision=20, scale=2))
    Consumed_Fact = db.Column(Numeric(precision=20, scale=2))
    Consumed_Total_Quota = db.Column(Numeric(precision=20, scale=2))
    Consumed_Total_Fact = db.Column(Numeric(precision=20, scale=2))
    total_differents = db.Column(Numeric(precision=20, scale=2))
    note = db.Column(db.String(200))
    product = relationship("DirProduct", foreign_keys=[id_product], backref="section")

class News(db.Model):
    __tablename__ = 'news'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    text = db.Column(db.String(300))
    img_name = db.Column(db.String(20))
    created_time = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
