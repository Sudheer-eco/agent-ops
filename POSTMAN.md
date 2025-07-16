# Postman Testing Steps

## 1. Login Test
POST http://localhost:3000/api/auth/login
Body (JSON):
```
{
  "email": "yourname@ecosleek.in",
  "password": "test123"
}
```
Check that response is success and cookies `sb-user-email` and `sb-access-token` are set.

## 2. Task Chat Test
1. Manually create a task record in Supabase and copy its `id`.
2. POST `http://localhost:3000/api/messages`
   Body:
   ```
   { "task_id": "<task-id>", "content": "Hello", "role": "user" }
   ```
3. POST `http://localhost:3000/api/gpt`
   Body:
   ```
   { "task_id": "<task-id>", "message": "Hello" }
   ```
   Observe assistant reply and stored messages.

## 3. Snippets Test
- GET `http://localhost:3000/api/tasks/<task-id>/snippets`
- POST `http://localhost:3000/api/snippets/explain`
  Body:
  ```
  { "code": "console.log('Hi')" }
  ```
- POST `http://localhost:3000/api/snippets/label`
  Body:
  ```
  { "id": "<snippet-id>", "label": "example" }
  ```
