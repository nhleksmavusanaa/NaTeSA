from flask import request, jsonify
from config import app, db
from models import User, Branche, Event, Alumni, News


@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "message": "API is working"})

#User API(CRUD)
@app.route("/users", methods=["GET"])
def get_users():
    user = User.query.all()
    json_user = list(map(lambda x: x.to_json(), user))
    return jsonify({"users": json_user})

# GET single user by ID
@app.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({"user": user.to_json()})
    return jsonify({"error": "User not found"}), 404

@app.route("/create_user", methods=["POST"])
def create_user():
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400
            
        data = request.get_json()
        print("Received registration data:", data)

        # Validate required fields
        required_fields = ['name', 'email', 'password', 'role', 'branch_id']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Check if user already exists
        existing_user = User.query.filter_by(email=data.get('email')).first()
        if existing_user:
            return jsonify({"error": "User with this email already exists"}), 400

        # Create new user - include nec_position
        new_user = User(
            name=data.get('name'),
            email=data.get('email'),
            role=data.get('role'),
            branch_id=data.get('branch_id'),
            is_bec_member=data.get('is_bec_member', 'no'),
            bec_position=data.get('bec_position', 'no'),
            nec_position=data.get('nec_position', 'N/A'),  # Add this line
            status=data.get('status', 'active')
        )
        
        new_user.set_password(data.get('password'))
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({
            "message": "User created successfully", 
            "user_id": new_user.id,
            "user": {
                "id": new_user.id,
                "name": new_user.name,
                "email": new_user.email,
                "role": new_user.role
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print("Error creating user:", str(e))
        return jsonify({"error": f"Database error: {str(e)}"}), 500

# UPDATE user
@app.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
            
        data = request.get_json()
        
        # Update fields if provided
        if 'name' in data:
            user.name = data['name']
        if 'email' in data:
            # Check if new email is unique
            existing = User.query.filter(User.email == data['email'], User.id != user_id).first()
            if existing:
                return jsonify({"error": "Email already in use"}), 400
            user.email = data['email']
        if 'role' in data:
            user.role = data['role']
        if 'branch_id' in data:
            user.branch_id = data['branch_id']
        if 'is_bec_member' in data:
            user.is_bec_member = data['is_bec_member']
        if 'bec_position' in data:
            user.bec_position = data['bec_position']
        if 'nec_position' in data:
            user.nec_position = data['nec_position']
        if 'status' in data:
            user.status = data['status']
        if 'password' in data:
            user.set_password(data['password'])
        
        db.session.commit()
        
        return jsonify({
            "message": "User updated successfully",
            "user": user.to_json()  # Use to_json method
        })
        
    except Exception as e:
        db.session.rollback()
        print("Error updating user:", str(e))
        return jsonify({"error": f"Database error: {str(e)}"}), 500

@app.route("/delete_user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user :
        return jsonify({"message": "User not found!"}), 404
    
    db.session.delete(user)
    db.commit()

    return jsonify({"message": "User deleted successful!"}), 201



# GET all branches
@app.route("/branches", methods=["GET"])
def get_branches():
    try:
        branches = Branche.query.all()
        json_branches = list(map(lambda x: x.to_json(), branches))
        return jsonify({"branches": json_branches})
    except Exception as e:
        print("Error fetching branches:", str(e))
        return jsonify({"error": "Failed to fetch branches"}), 500

# GET single branch by ID
@app.route("/branches/<int:branch_id>", methods=["GET"])
def get_branch(branch_id):
    try:
        branch = Branche.query.get(branch_id)
        if branch:
            return jsonify({"branch": branch.to_json()})
        return jsonify({"error": "Branch not found"}), 404
    except Exception as e:
        print("Error fetching branch:", str(e))
        return jsonify({"error": "Failed to fetch branch"}), 500

# CREATE branch
@app.route("/create_branch", methods=["POST"])
def create_branch():
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400
            
        data = request.get_json()
        print("Received branch data:", data)

        # Validate required fields based on your Branche model
        required_fields = ['name', 'university', 'province']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Check if branch already exists (by name)
        existing_branch = Branche.query.filter_by(name=data.get('name')).first()
        if existing_branch:
            return jsonify({"error": "Branch with this name already exists"}), 400

        # Create new branch using your model fields
        new_branch = Branche(
            name=data.get('name'),
            university=data.get('university'),
            province=data.get('province'),
            member_count=data.get('member_count', 0),  # Default to 0
            alumni_count=data.get('alumni_count', 0)   # Default to 0
        )
        
        db.session.add(new_branch)
        db.session.commit()
        
        return jsonify({
            "message": "Branch created successfully", 
            "branch": new_branch.to_json()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print("Error creating branch:", str(e))
        return jsonify({"error": f"Database error: {str(e)}"}), 500

# UPDATE branch
@app.route("/update_branch/<int:branch_id>", methods=["PUT"])
def update_branch(branch_id):
    try:
        branch = Branche.query.get(branch_id)
        if not branch:
            return jsonify({"error": "Branch not found"}), 404
            
        data = request.get_json()
        
        # Update fields if provided
        if 'name' in data:
            # Check if new name is unique
            existing = Branche.query.filter(Branche.name == data['name'], Branche.id != branch_id).first()
            if existing:
                return jsonify({"error": "Branch name already in use"}), 400
            branch.name = data['name']
            
        if 'university' in data:
            branch.university = data['university']
        if 'province' in data:
            branch.province = data['province']
        if 'member_count' in data:
            branch.member_count = data['member_count']
        if 'alumni_count' in data:
            branch.alumni_count = data['alumni_count']
        
        db.session.commit()
        
        return jsonify({
            "message": "Branch updated successfully",
            "branch": branch.to_json()
        })
        
    except Exception as e:
        db.session.rollback()
        print("Error updating branch:", str(e))
        return jsonify({"error": f"Database error: {str(e)}"}), 500

# DELETE branch
@app.route("/delete_branch/<int:branch_id>", methods=["DELETE"])
def delete_branch(branch_id):
    try:
        branch = Branche.query.get(branch_id)

        if not branch:
            return jsonify({"error": "Branch not found"}), 404
        
        # Check if branch has users before deleting
        users_in_branch = User.query.filter_by(branch_id=branch_id).count()
        if users_in_branch > 0:
            return jsonify({
                "error": f"Cannot delete branch. There are {users_in_branch} users assigned to this branch."
            }), 400
        
        db.session.delete(branch)
        db.session.commit()

        return jsonify({"message": "Branch deleted successfully!"}), 200
        
    except Exception as e:
        db.session.rollback()
        print("Error deleting branch:", str(e))
        return jsonify({"error": f"Database error: {str(e)}"}), 500



#ALUMNI API(CRUD)
# GET all alumni
@app.route("/alumni", methods=["GET"])
def get_alumni():
    try:
        alumni_list = Alumni.query.all()
        json_alumni = list(map(lambda x: x.to_json(), alumni_list))
        return jsonify({"alumni": json_alumni})
    except Exception as e:
        print("Error fetching alumni:", str(e))
        return jsonify({"error": "Failed to fetch alumni"}), 500

# GET single alumni by ID
@app.route("/alumni/<int:alumni_id>", methods=["GET"])
def get_alumni_by_id(alumni_id):
    try:
        alumni = Alumni.query.get(alumni_id)
        if alumni:
            return jsonify({"alumni": alumni.to_json()})
        return jsonify({"error": "Alumni not found"}), 404
    except Exception as e:
        print("Error fetching alumni:", str(e))
        return jsonify({"error": "Failed to fetch alumni"}), 500

# CREATE alumni
@app.route("/create_alumni", methods=["POST"])
def create_alumni():
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400
            
        data = request.get_json()
        print("Received alumni data:", data)

        # Validate required fields based on your model
        required_fields = ['user_id', 'branch_id', 'degree']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Check if alumni record already exists for this user
        existing_alumni = Alumni.query.filter_by(user_id=data.get('user_id')).first()
        if existing_alumni:
            return jsonify({"error": "Alumni record already exists for this user"}), 400

        # Create new alumni
        new_alumni = Alumni(
            user_id=data.get('user_id'),
            branch_id=data.get('branch_id'),
            degree=data.get('degree'),
            graduation_date=data.get('graduation_date'),  # Optional, will use default if not provided
            current_status=data.get('current_status', 'draft')
        )
        
        db.session.add(new_alumni)
        db.session.commit()
        
        return jsonify({
            "message": "Alumni record created successfully", 
            "alumni": new_alumni.to_json()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print("Error creating alumni:", str(e))
        return jsonify({"error": f"Database error: {str(e)}"}), 500

# UPDATE alumni
@app.route("/update_alumni/<int:alumni_id>", methods=["PUT"])
def update_alumni(alumni_id):  # Fixed parameter name (was Alumni_id)
    try:
        alumni = Alumni.query.get(alumni_id)
        if not alumni:
            return jsonify({"error": "Alumni record not found"}), 404
            
        data = request.get_json()
        
        # Update fields if provided
        if 'user_id' in data:
            # Check if new user_id already has an alumni record
            existing = Alumni.query.filter(Alumni.user_id == data['user_id'], Alumni.id != alumni_id).first()
            if existing:
                return jsonify({"error": "Alumni record already exists for this user"}), 400
            alumni.user_id = data['user_id']
            
        if 'branch_id' in data:
            alumni.branch_id = data['branch_id']
        if 'degree' in data:
            alumni.degree = data['degree']
        if 'graduation_date' in data:
            alumni.graduation_date = data['graduation_date']
        if 'current_status' in data:
            alumni.current_status = data['current_status']
        
        db.session.commit()
        
        return jsonify({
            "message": "Alumni record updated successfully",
            "alumni": alumni.to_json()
        })
        
    except Exception as e:
        db.session.rollback()
        print("Error updating alumni:", str(e))
        return jsonify({"error": f"Database error: {str(e)}"}), 500

# DELETE alumni
@app.route("/delete_alumni/<int:alumni_id>", methods=["DELETE"])
def delete_alumni(alumni_id):
    try:
        alumni = Alumni.query.get(alumni_id)  # Fixed capitalization

        if not alumni:
            return jsonify({"error": "Alumni record not found"}), 404
        
        db.session.delete(alumni)
        db.session.commit()  # Fixed method name

        return jsonify({"message": "Alumni record deleted successfully!"}), 200
        
    except Exception as e:
        db.session.rollback()
        print("Error deleting alumni:", str(e))
        return jsonify({"error": f"Database error: {str(e)}"}), 500


#Event API(CRUD)
@app.route("/events", methods=["GET"])
def get_events():
    events = Event.query.all()
    json_events = list(lambda x: x.to_json(), events)
    return jsonify({"events": json_events})

@app.route("/create_event", methods = ["POST"])
def create_event():
    title = request.json.get("title")
    date = request.json.get("date")
    branch_id = request.json.get("branchId")
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


#News API(CRUD)
# GET all news
@app.route("/news", methods=["GET"])
def get_news():
    try:
        news_list = News.query.all()
        json_news = list(map(lambda x: x.to_json(), news_list))
        return jsonify({"news": json_news})
    except Exception as e:
        print("Error fetching news:", str(e))
        return jsonify({"error": "Failed to fetch news"}), 500

# GET single news by ID
@app.route("/news/<int:news_id>", methods=["GET"])
def get_news_by_id(news_id):
    try:
        news = News.query.get(news_id)
        if news:
            return jsonify({"news": news.to_json()})
        return jsonify({"error": "News article not found"}), 404
    except Exception as e:
        print("Error fetching news:", str(e))
        return jsonify({"error": "Failed to fetch news article"}), 500

# GET news by branch_id
@app.route("/news/branch/<int:branch_id>", methods=["GET"])
def get_news_by_branch(branch_id):
    try:
        news_list = News.query.filter_by(branch_id=branch_id).all()
        json_news = list(map(lambda x: x.to_json(), news_list))
        return jsonify({
            "news": json_news,
            "count": len(json_news)
        })
    except Exception as e:
        print("Error fetching news by branch:", str(e))
        return jsonify({"error": "Failed to fetch news articles"}), 500

# CREATE news
@app.route("/create_news", methods=["POST"])
def create_news():
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400
            
        data = request.get_json()
        print("Received news data:", data)

        # Validate required fields
        required_fields = ['title', 'content', 'branch_id', 'author_id']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Create new news article
        new_news = News(
            title=data.get('title'),
            content=data.get('content'),
            branch_id=data.get('branch_id'),
            author_id=data.get('author_id'),
            publish_date=data.get('publish_date')  # Will use default if not provided
        )
        
        db.session.add(new_news)
        db.session.commit()
        
        return jsonify({
            "message": "News article created successfully", 
            "news": new_news.to_json()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print("Error creating news:", str(e))
        return jsonify({"error": f"Database error: {str(e)}"}), 500

# UPDATE news
@app.route("/update_news/<int:news_id>", methods=["PUT"])
def update_news(news_id):
    try:
        news = News.query.get(news_id)
        if not news:
            return jsonify({"error": "News article not found"}), 404
            
        data = request.get_json()
        
        # Update fields if provided
        if 'title' in data:
            news.title = data['title']
        if 'content' in data:
            news.content = data['content']
        if 'branch_id' in data:
            news.branch_id = data['branch_id']
        if 'author_id' in data:
            news.author_id = data['author_id']
        if 'publish_date' in data:
            news.publish_date = data['publish_date']
        
        db.session.commit()
        
        return jsonify({
            "message": "News article updated successfully",
            "news": news.to_json()
        })
        
    except Exception as e:
        db.session.rollback()
        print("Error updating news:", str(e))
        return jsonify({"error": f"Database error: {str(e)}"}), 500

# DELETE news
@app.route("/delete_news/<int:news_id>", methods=["DELETE"])
def delete_news(news_id):
    try:
        news = News.query.get(news_id)

        if not news:
            return jsonify({"error": "News article not found"}), 404
        
        db.session.delete(news)
        db.session.commit()

        return jsonify({"message": "News article deleted successfully!"}), 200
        
    except Exception as e:
        db.session.rollback()
        print("Error deleting news:", str(e))
        return jsonify({"error": f"Database error: {str(e)}"}), 500
    
# Login 
@app.route("/login", methods=["POST"])
def login():
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400
            
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        # Find user by email
        user = User.query.filter_by(email=email).first()
        
        if not user:
            return jsonify({"error": "Invalid email or password"}), 401
        
        # Check password
        if not user.check_password(password):
            return jsonify({"error": "Invalid email or password"}), 401

        # Check if user is active
        if user.status != 'active':
            return jsonify({"error": "Account is not active. Please contact administrator."}), 401

        # Login successful
        return jsonify({
            "message": "Login successful",
            "user": user.to_json(),
            "token": "your-jwt-token-here"  # Implement JWT if needed
        }), 200
        
    except Exception as e:
        print("Login error:", str(e))
        return jsonify({"error": "Internal server error"}), 500
    
if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)