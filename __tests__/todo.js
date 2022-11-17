/* eslint-disable no-undef */
const todo = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todo();
const today = new Date().toLocaleDateString("en-CA");
describe("TODO test suite", () => {
  beforeAll(() => {
    add({
      title: "eat momos",
      dueDate: today,
      completed: true,
    });
  });
  test("Add task", () => {
    let lengthBefore = all.length;
    add({
      title: " go to restaurant",
      dueDate: today,
      completed: false,
    });
    expect(all.length).toBe(lengthBefore + 1);
  });
  test("Mark task as complete", () => {
    all[0].completed = false;
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Over due tasks", () => {
    const overdueItems = overdue();
    var prev_date = new Date();
    prev_date.setDate(prev_date.getDate() - 1);
    let yesterday = prev_date.toLocaleDateString("en-CA");
    add({
      title: "Buy momos",
      dueDate: yesterday,
      completed: false,
    });
    expect(overdue().length).toBe(overdueItems.length + 1);
  });
  test("Due today tasks", () => {
    const todayItems = dueToday();
    add({
      title: "eat momos",
      dueDate: today,
      completed: false,
    });
    expect(dueToday().length).toBe(todayItems.length + 1);
  });
  test("Due later tasks", () => {
    const duelaterItems = dueLater();
    var tomorrow_date = new Date();
    tomorrow_date.setDate(tomorrow_date.getDate() + 1);
    let tomorrow = tomorrow_date.toLocaleDateString("en-CA");
    add({
      title: "Cook momos",
      dueDate: tomorrow,
      completed: false,
    });
    expect(dueLater().length).toBe(duelaterItems.length + 1);
  });
});
