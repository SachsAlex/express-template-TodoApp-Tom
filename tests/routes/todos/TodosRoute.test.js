const request = require("supertest");
const app = require("../../../src/server");

describe("GET /v1/todos/all", () => {
  test("Test /all todos route", async () => {
    const response = await request(app)
      .get("/v1/todos/all")
      .expect("Content-Type", /json/)
      .expect(200);

    const myTodos = response.body;
    const myFirstTodo = myTodos[0];

    expect(myTodos.length).toBeGreaterThan(0);
    expect(myFirstTodo.id).toBeDefined();
    expect(myFirstTodo.task).toBeDefined();
    expect(myFirstTodo.userId).toBeDefined();
  });

  test("GET by Id", async () => {
    const todoId = 1;
    const response = await request(app)
      .get(`/v1/todos/byid?todoId=${todoId}`)
      .expect("Content-Type", /json/)
      .expect(200);

    const myTodo = response.body.todo;

    expect(myTodo.id).toEqual(todoId);
  });
});

describe("Test Mutations (PUT,POST, DELETE)", () => {
  test("Test Create Object", async () => {
    const response = await request(app)
      .post(`/v1/todos/create`)
      .send({
        newTask: "Tennis spielen",
        newIsDone: false,
        newDueDate: "2026-10-10",
        newUserId: 2,
      })
      .expect("Content-Type", /json/)
      .expect(200);

    const newTodo = response.body;

    expect(newTodo.todo.userId).toEqual(2);
    expect(newTodo.todo.task).toBeDefined();
    expect(newTodo.todo.isDone).toBeDefined();
    expect(newTodo.todo.dueDate).toBeDefined();
  });

  test("Test Put Object", async () => {
    const response = await request(app)
      .put(`/v1/todos/update`)
      .send({
        todoId: 5,
        newTask: "Tennis spielen",
        newIsDone: true,
        newDueDate: "2023-10-10",
      })
      .expect("Content-Type", /json/)
      .expect(200);

    const updatedTodo = response.body;

    expect(updatedTodo.updatedTodoId).toEqual(5);
    // expect(updatedTodo.todo.task).toBeDefined();
    // expect(updatedTodo.todo.isDone).toBeDefined();
    // expect(updatedTodo.todo.dueDate).toBeDefined();
  });
});
