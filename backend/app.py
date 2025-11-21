from flask import Flask
from flask_cors import CORS
from config import Config
from database import db

from routes.book_routes import book_routes

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
db.init_app(app)

# Register blueprint
app.register_blueprint(book_routes)

# Create tables
with app.app_context():
    db.create_all()

@app.get("/")
def home():
    return {"message": "Backend running"}

if __name__ == "__main__":
    app.run(debug=True)
