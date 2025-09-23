from flask import request, jsonify
from config import app, db
from models import User, Branche, Event, Alumni, News


#User API(CRUD)
@app.route("/users", methods=["GET"])
def get_users():
    user = User.query.all()
    json_user = list(map(lambda x: x.json(), user))
    return jsonify({"users": json_user})

@app.route("/create_user", methods=["POST"])
def create_user():
    user = User.query.get(user_id)


@app.route("/update_user/<int:User_id>")
def update_user(User_id):
    user = User.query.get(user_id)

@app.route("/delete_user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user :
        return jsonify({"message": "User not found!"}), 404
    
    db.session.delete(user)
    db.commit()

    return jsonify({"message": "User deleted successful!"}), 201




#Branches API(CRUD)
@app.route("/branches", methods=["GET"])
def get_branches():
    return jsonify()

@app.route("/create_branches", methods=["POST"])
def create_branch():
    branch = Branch.query.get(branch_id)

@app.route("/update_branch/<int:branch_id>")
def update_branch(Branch_id):
    branch = Branch.query.get(branch_id)

@app.route("/delete_branch/<int:branch_id>", methods=["DELETE"])
def delete_branch(branch_id):
    branch = branch.query.get(branch_id)

    if not branch :
        return jsonify({"message": "Branch not found!"}), 404
    
    db.session.delete(branch)
    db.commit()

    return jsonify({"message": "Branch deleted successful!"}), 201



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

    return jsonify({"message": "Event deleted successful!"}), 201

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)


#News API(CRUD)