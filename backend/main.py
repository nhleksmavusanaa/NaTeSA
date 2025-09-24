from flask import request, jsonify, session
from config import app, db
from models import User, Branche, Event, Alumni, News
from functools import wraps


def role_required(*roles):
    def wrapper(fn):
        @wraps(fn)
        def decorated_view(*args, **kwargs):
            if 'role' not in session or session['role'] not in roles:
                return jsonify({"message": "Unauthorized"}), 403
            return fn(*args, **kwargs)
        return decorated_view
    return wrapper

#User API(CRUD)
@app.route("/users", methods=["GET"])
@role_required('admin', 'nec', 'bec')
def get_users():
    current_user_role = session.get('role')
    current_user_branch_id = session.get('branch_id')

    query = User.query

    # Admin and NEC can see all users
    # BEC can only see users in their own branch
    if current_user_role == 'bec':
        if not current_user_branch_id:
            return jsonify({"message": "BEC members must be associated with a branch."}), 400
        query = query.filter_by(branch_id=current_user_branch_id)

    users = query.all()
    json_user = [user.to_json() for user in users]
    return jsonify({"users": json_user})

@app.route("/create_user", methods=["POST"])
def create_user():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "member")
    branch_id = data.get("branch_id")

    if not name or not email or not password:
        return jsonify({"error": "You must include a name, email, and password"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400

    new_user = User(
        name=name,
        email=email,
        role=role,
        branch_id=branch_id,
        is_bec_member=data.get('is_bec_member', False),
        nec_position=data.get('nec_position'),
        bec_position=data.get('bec_position'),
        status=data.get('status', 'active')
    )
    new_user.set_password(password)

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

    return jsonify(new_user.to_json()), 201


@app.route("/update_user/<int:user_id>", methods=["PATCH"])
@role_required('admin', 'nec', 'bec') # Or adjust permissions as needed
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Logic to check if the current user is allowed to update this user
    # e.g., admin can update anyone, bec can update members in their branch

    data = request.get_json()
    user.name = data.get("name", user.name)
    user.email = data.get("email", user.email)
    user.role = data.get("role", user.role)
    # ... update other fields as needed

    db.session.commit()
    return jsonify(user.to_json()), 200

@app.route("/delete_user/<int:user_id>", methods=["DELETE"])
@role_required('admin', 'nec', 'bec')
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user :
        return jsonify({"message": "User not found!"}), 404
    
    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully!"}), 200




#Branches API(CRUD)
@app.route("/branches", methods=["GET"])
def get_branches():
    return jsonify()

@app.route("/create_branches", methods=["POST"])
def create_branch():
    branch = Branche.query.get(branch_id)

@app.route("/update_branch/<int:branch_id>")
def update_branch(Branch_id):
    branch = Branche.query.get(branch_id)

@app.route("/delete_branch/<int:branch_id>", methods=["DELETE"])
def delete_branch(branch_id):
    branch = Branche.query.get(branch_id)

    if not branch :
        return jsonify({"message": "Branch not found!"}), 404
    
    db.session.delete(branch)
    db.commit()

    return jsonify({"message": "Branch deleted successfully!"}), 200



#ALUMNI API(CRUD)
@app.route("/alumni", methods=["GET"])
def get_alumni():
    return jsonify()

@app.route("/create_alumni", methods=["POST"])
def create_alumni():
    alumni = Alumni.query.get(alumni_id)

@app.route("/update_alumni/<int:alumni_id>")
def update_alumni(Alumni_id):
    alumni = Alumni.query.get(alumni_id)

@app.route("/delete_alumni/<int:alumni_id>", methods=["DELETE"])
def delete_alumni(alumni_id):
    alumni = alumni.query.get(alumni_id)

    if not alumni :
        return jsonify({"message": "Alumni not found!"}), 404
    
    db.session.delete(alumni)
    db.commit()

    return jsonify({"message": "Alumni deleted successful!"}), 201



#Event API(CRUD)
@app.route("/events", methods=["GET"])
def get_events():
    events = Event.query.all()
    json_events = list(map(lambda x: x.json(), events))
    return jsonify({"events": json_events})

@app.route("/create_event", methods = ["POST"])
def create_event():
    title = request.json.get("title")
    date = request.json.get("date")
    branch_id = request.json.get("branchId"),
    created_by = request.json.get("createBy")
    event_type = request.json.get("eventType")
    
    if not title or not date or not branch_id or not created_by or not event_type:
        return (jsonify({"message": "You must include a title, date, branch id,created by, and event type."}), 
                400)
    new_event = Event(title=title, date=date, branch_id=branch_id, created_by =created_by, event_type=event_type)
    try:
        db.session.add(new_event)
        db.session.commit()
    except Exception as e:
        return (jsonify({"message":str(e)}), 400)
    
    return (jsonify({"message": "Event created"}), 201)

@app.route("/update_event/<int:event_id>")
def update_event(event_id):
    event = Event.query.get(event_id)

    if not event:
        return jsonify({"message": "Event not found"}), 404
    
    data = data.request.json
    event.title = data.get("title", event.title)
    event.date = data.get("title", event.date)
    event.branch_id = data.get("title", event.branch_id)
    event.created_by = data.get("title", event.created_by)
    event.event_type = data.get("title", event.event_type)

    db.session.commit()

    return jsonify({"message": "Event updated"})

@app.route("/delete_event/<int:event_id>", methods=["DELETE"])
def delete_event(event_id):
    event = Event.query.get(event_id)

    if not event :
        return jsonify({"message": "Event not found!"}), 404
    
    db.session.delete(event)
    db.commit()

    return jsonify({"message": "Event deleted successfully!"}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)


#News API(CRUD)