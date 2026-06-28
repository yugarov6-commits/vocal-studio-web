import json
import os
import psycopg

def handler(event: dict, context) -> dict:
    """Получение и сохранение отзывов."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    def esc(s):
        return s.replace("'", "''") if s else ''

    with psycopg.connect(os.environ['DATABASE_URL']) as conn:
        with conn.cursor() as cur:

            if event.get('httpMethod') == 'GET':
                cur.execute("SELECT id, name, course, text, rating, created_at FROM reviews ORDER BY created_at DESC LIMIT 50")
                rows = cur.fetchall()
                reviews = [
                    {'id': r[0], 'name': r[1], 'course': r[2], 'text': r[3], 'rating': r[4], 'created_at': r[5].isoformat()}
                    for r in rows
                ]
                return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'reviews': reviews})}

            if event.get('httpMethod') == 'POST':
                body = json.loads(event.get('body') or '{}')
                name = body.get('name', '').strip()
                course = body.get('course', '').strip()
                text = body.get('text', '').strip()
                rating = int(body.get('rating', 5))

                if not name or not text:
                    return {'statusCode': 400, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Имя и текст обязательны'})}

                if rating < 1 or rating > 5:
                    rating = 5

                course_val = f"'{esc(course)}'" if course else 'NULL'
                cur.execute(f"INSERT INTO reviews (name, course, text, rating) VALUES ('{esc(name)}', {course_val}, '{esc(text)}', {rating}) RETURNING id")
                new_id = cur.fetchone()[0]
                conn.commit()
                return {'statusCode': 201, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'id': new_id, 'success': True})}

    return {'statusCode': 405, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Method not allowed'})}
