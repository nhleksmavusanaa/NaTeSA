import os
from flask import Flask, render_template, redirect, url_for, flash, request, session
import re

# Import your existing API methods
from main import get_users, create_user  

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

def check_user_exists(email=None):
    """Check if a user exists using your existing API method"""
    try:
        if email:
            # Get all users and check if email exists
            users = get_users()
            if users and isinstance(users, list):
                return any(user.get('email') == email for user in users)
            return False
    except Exception as e:
        print(f"Error checking user existence: {e}")
        return False

def create_user_via_api(name, email, password, role='member', branch_id=None, 
                       is_bec_member=False, nec_position=None, bec_position=None, status='active'):
    """Create a new user using your existing API create method"""
    try:
        # Prepare user data according to what your API expects
        user_data = {
            'name': name,
            'email': email,
            'password': password,
            'role': role,
            'branch_id': branch_id,
            'is_bec_member': is_bec_member,
            'nec_position': nec_position,
            'bec_position': bec_position,
            'status': status
        }
        
        # Use your existing create method
        result = create_user(user_data)
        
        # Handle different return types from your API
        if isinstance(result, dict) and 'error' in result:
            raise Exception(result['error'])
        elif result is None:
            raise Exception("User creation failed - no result returned")
        else:
            return result
            
    except Exception as e:
        raise Exception(f"API Error: {str(e)}")

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
        branch_id = request.form.get('branch_id', '').strip()
        is_bec_member = request.form.get('is_bec_member', '').strip()
        nec_position = request.form.get('nec_position', '').strip()
        bec_position = request.form.get('bec_position', '').strip()
        status = request.form.get('status', '').strip()
        
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
        
        valid_roles = ['admin', 'nec', 'bec', 'member']
        if role not in valid_roles:
            errors.append('Please select a valid role')
        
        # Check for existing users using your API
        if not errors:
            try:
                if check_user_exists(email=email):
                    errors.append('Email already registered. Please use a different email.')
            except Exception as e:
                errors.append('Error checking user existence. Please try again.')
        
        # If no errors, create user using your existing API method
        if not errors:
            try:
                # Use your existing create method
                created_user = create_user_via_api(
                    name=name,
                    email=email,
                    password=password,
                    role=role,
                    branch_id=branch_id,
                    is_bec_member=is_bec_member,
                    nec_position=nec_position,
                    bec_position=bec_position,
                    status=status
                )
                
                # Store user info in session
                session['user_id'] = created_user.get('id') or created_user.get('user_id')
                session['name'] = created_user.get('name', name)
                session['email'] = created_user.get('email', email)
                session['role'] = created_user.get('role', role)
                session['branch_id'] = created_user.get('branch_id', branch_id)
                session['is_bec_member'] = created_user.get('is_bec_member', is_bec_member)
                session['nec_position'] = created_user.get('nec_position', nec_position)
                session['bec_position'] = created_user.get('bec_position', bec_position)
                session['status'] = created_user.get('status', status)
                
                flash(f'Registration successful! Welcome, {name}', 'success')
                
                # Redirect based on role
                redirect_url = get_redirect_url_by_role(role)
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
                # Get all users from your API
                users = get_users()
                
                # Find user by email and password
                user = None
                if users and isinstance(users, list):
                    user = next((u for u in users if u.get('email') == email and u.get('password') == password), None)
                
                if user:
                    # Store user info in session
                    session['user_id'] = user.get('id')
                    session['name'] = user.get('name')
                    session['email'] = user.get('email')
                    session['role'] = user.get('role')
                    session['branch_id'] = user.get('branch_id')
                    session['is_bec_member'] = user.get('is_bec_member')
                    session['nec_position'] = user.get('nec_position')
                    session['bec_position'] = user.get('bec_position')
                    session['status'] = user.get('status')
                    session['logged_in'] = True
                    
                    flash(f'Welcome back, {user.get("name")}!', 'success')
                    redirect_url = get_redirect_url_by_role(user.get('role'))
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
    
    return render_template('profile.html', 
                         name=session.get('name'),
                         email=session.get('email'),
                         role=session.get('role'),
                         branch_id=session.get('branch_id'),
                         is_bec_member=session.get('is_bec_member'),
                         nec_position=session.get('nec_position'),
                         bec_position=session.get('bec_position'),
                         status=session.get('status'))

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(debug=True)