from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime
import sqlite3
import json

app = FastAPI()

# Inicializar base de datos SQLite
def init_db():
    conn = sqlite3.connect("ecommerce.db")
    cursor = conn.cursor()
    
    # Tabla de carritos guardados
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS carts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            items TEXT NOT NULL,
            total REAL NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    conn.commit()
    conn.close()

# Inicializar DB al arrancar
init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Backend funcionando correctamente"}

@app.get("/products")
def get_products():
    return [
        {
            "id": 1,
            "name": "Producto A",
            "price": 100.0
        },
        {
            "id": 2,
            "name": "Producto B",
            "price": 150.0
        },
        {
            "id": 3,
            "name": "Producto C",
            "price": 200.0
        }
    ]

# Modelos Pydantic
class CartItem(BaseModel):
    product_id: int
    quantity: int

class Cart(BaseModel):
    items: List[CartItem]

@app.post("/cart")
def save_cart(cart: Cart):
    # Calcular total
    products = get_products()
    total = 0
    for item in cart.items:
        product = next((p for p in products if p["id"] == item.product_id), None)
        if product:
            total += product["price"] * item.quantity
    
    # Guardar en base de datos
    conn = sqlite3.connect("ecommerce.db")
    cursor = conn.cursor()
    
    cursor.execute(
        "INSERT INTO carts (items, total) VALUES (?, ?)",
        (json.dumps([item.dict() for item in cart.items]), total)
    )
    
    conn.commit()
    cart_id = cursor.lastrowid
    conn.close()
    
    return {
        "message": "Carrito guardado correctamente",
        "cart_id": cart_id,
        "total": total
    }

@app.get("/carts")
def get_carts():
    """Endpoint para ver todos los carritos guardados"""
    conn = sqlite3.connect("ecommerce.db")
    cursor = conn.cursor()
    
    cursor.execute("SELECT id, items, total, created_at FROM carts ORDER BY created_at DESC")
    rows = cursor.fetchall()
    conn.close()
    
    carts = []
    for row in rows:
        carts.append({
            "id": row[0],
            "items": json.loads(row[1]),
            "total": row[2],
            "created_at": row[3]
        })
    
    return carts