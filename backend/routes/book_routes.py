from flask import Blueprint, request, jsonify
from database import db
from models.book import Book

book_routes = Blueprint("book_routes", __name__)

# GET ALL BOOKS
@book_routes.get("/api/books")
def get_books():
    books = Book.query.all()
    return jsonify([b.to_dict() for b in books])

# PURCHASE BOOK
@book_routes.post("/api/purchase")
def purchase_book():
    data = request.json
    title = data.get("title")

    book = Book.query.filter_by(title=title).first()

    if not book:
        return jsonify({"error": "Book not found"}), 404

    book.availability = "Out of Stock"
    db.session.commit()

    return jsonify({"message": "Book purchased", "book": book.to_dict()})

# ADD NEW BOOK
@book_routes.post("/api/add-book")
def add_book():
    data = request.json

    new_book = Book(
        title=data["title"],
        author=data["author"],
        genre=data["genre"],
        price=data["price"],
        availability="In Stock"
    )

    db.session.add(new_book)
    db.session.commit()

    return jsonify({"message": "Book added", "book": new_book.to_dict()})


# UPDATE BOOK
@book_routes.put("/api/update-book/<int:id>")
def update_book(id):
    data = request.json
    book = Book.query.get(id)

    if not book:
        return jsonify({"error": "Book not found"}), 404

    book.title = data.get("title", book.title)
    book.author = data.get("author", book.author)
    book.genre = data.get("genre", book.genre)
    book.price = data.get("price", book.price)

    db.session.commit()

    return jsonify({"message": "Book updated", "book": book.to_dict()})
