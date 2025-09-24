import os
from flask import Flask, render_template, redirect, url_for, flash, request, session
import re
from werkzeug.security import generate_password_hash, check_password_hash

# Import your existing API methods
from models import db, User

app = Flask(__name__, template_folder='../templates')
app.config['SECRET_KEY'] = 'your-secret-key-here'

def is_strong_password(password):
    """Check if password meets strength requirements"""
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    if not re.search(r"[A-Z]", password):
        return False, "Password must contain at least one uppercase letter"
    if not re.search(r"[a-z]", password):
        return False, "Password must contain at least one lowercase letter"
    if not re.search(r"\d", password):
        return False, "Password must contain at least one digit"
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return False, "Password must contain at least one special character"
    return True, "Password is strong"

def validate_email(email):
    """Simple email validation"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def get_redirect_url_by_role(role):
    """Determine redirect URL based on user role"""
    role_redirects = {
        'admin': '/admin/dashboard',
        'nec': '/nec/dashboard', 
        'bec': '/bec/dashboard',
        'member': '/member/dashboard'
    }
    return role_redirects.get(role, '/dashboard')

@app.route('/')
def index():
    return redirect(url_for('register'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        confirm_password = request.form.get('confirm_password', '')
        role = request.form.get('role', 'member')
        branch_id_str = request.form.get('branch_id', '').strip()
        branch_id = int(branch_id_str) if branch_id_str.isdigit() else None
        is_bec_member = 'is_bec_member' in request.form
        nec_position = request.form.get('nec_position', '').strip() or None
        bec_position = request.form.get('bec_position', '').strip() or None
        
        errors = []
        
        # Validate inputs
        if not name:
            errors.append('Name is required')
        elif len(name) < 2 or len(name) > 50:
            errors.append('Name must be between 2 and 50 characters')
        
        if not email:
            errors.append('Email is required')
        elif not validate_email(email):
            errors.append('Please enter a valid email address')
        
        if not password:
            errors.append('Password is required')
        elif len(password) < 8:
            errors.append('Password must be at least 8 characters long')
        elif password != confirm_password:
            errors.append('Passwords do not match')
        else:
            is_strong, msg = is_strong_password(password)
            if not is_strong:
                errors.append(msg)
        
        valid_roles = ['admin', 'nec', 'bec', 'member', 'alumni']
        if role not in valid_roles:
            errors.append('Please select a valid role')
        
        if User.query.filter_by(email=email).first():
            errors.append('Email already registered. Please use a different email.')
        
        # If no errors, create user using your existing API method
        if not errors:
            try:
                new_user = User(
                    name=name,
                    email=email,
                    role=role,
                    branch_id=branch_id,
                    is_bec_member=is_bec_member,
                    nec_position=nec_position,
                    bec_position=bec_position
                )
                new_user.set_password(password)
                db.session.add(new_user)
                db.session.commit()
                
                # Store user info in session
                session['user_id'] = new_user.id
                session['name'] = new_user.name
                session['email'] = new_user.email
                session['role'] = new_user.role
                session['branch_id'] = new_user.branch_id
                session['logged_in'] = True
                
                flash(f'Registration successful! Welcome, {name}', 'success')
                
                # Redirect based on role
                redirect_url = get_redirect_url_by_role(new_user.role)
                return redirect(redirect_url)
                
            except Exception as e:
                error_str = str(e).lower()
                if 'email' in error_str and ('unique' in error_str or 'exists' in error_str):
                    errors.append('Email already registered')
                elif 'duplicate' in error_str:
                    errors.append('User with these details already exists')
                else:
                    errors.append(f'Registration error: {str(e)}')
        
        # If there are errors, show them
        for error in errors:
            flash(error, 'error')
    
    return render_template('register.html')

@app.route('/success')
def success():
    name = request.args.get('name', 'User')
    role = request.args.get('role', 'member')
    return render_template('success.html', name=name, role=role)

# Role-based dashboard routes
@app.route('/admin/dashboard')
def admin_dashboard():
    if session.get('role') != 'admin':
        flash('Access denied. Admin privileges required.', 'error')
        return redirect(url_for('register'))
    return render_template('admin_dashboard.html', name=session.get('name'))

@app.route('/nec/dashboard')
def nec_dashboard():
    if session.get('role') not in ['admin', 'nec']:
        flash('Access denied. NEC privileges required.', 'error')
        return redirect(url_for('register'))
    return render_template('nec_dashboard.html', name=session.get('name'))

@app.route('/bec/dashboard')
def bec_dashboard():
    if session.get('role') not in ['admin', 'nec', 'bec']:
        flash('Access denied. BEC privileges required.', 'error')
        return redirect(url_for('register'))
    return render_template('bec_dashboard.html', name=session.get('name'))

@app.route('/member/dashboard')
def member_dashboard():
    if not session.get('user_id'):
        flash('Please log in first.', 'error')
        return redirect(url_for('register'))
    return render_template('member_dashboard.html', name=session.get('name'))

@app.route('/dashboard')
def dashboard():
    """Fallback dashboard that redirects based on role"""
    role = session.get('role', 'member')
    return redirect(get_redirect_url_by_role(role))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        
        errors = []
        
        if not email:
            errors.append('Email is required')
        
        if not password:
            errors.append('Password is required')
        
        if not errors:
            try:
                user = User.query.filter_by(email=email).first()
                
                if user and user.check_password(password):
                    # Store user info in session
                    session['user_id'] = user.id
                    session['name'] = user.name
                    session['email'] = user.email
                    session['role'] = user.role
                    session['branch_id'] = user.branch_id
                    session['logged_in'] = True
                    
                    flash(f'Welcome back, {user.name}!', 'success')
                    redirect_url = get_redirect_url_by_role(user.role)
                    return redirect(redirect_url)
                else:
                    errors.append('Invalid email or password')
                    
            except Exception as e:
                errors.append('Login error. Please try again.')
        
        for error in errors:
            flash(error, 'error')
    
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('You have been logged out successfully.', 'success')
    return redirect(url_for('login'))  # Redirect to login page after logout

@app.route('/profile')
def profile():
    if not session.get('user_id'):
        flash('Please log in first.', 'error')
        return redirect(url_for('login'))

    user = User.query.get(session['user_id'])
    if not user:
        session.clear()
        flash('User not found, please log in again.', 'error')
        return redirect(url_for('login'))

    # In a real app, you would have a form here to update the user profile.
    # For now, just displaying the data.
    return render_template('profile.html', user=user)


# Error handlers
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(debug=True)