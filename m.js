(async function tasks() {
  const data = await fetch("https://coinrush.pages.dev/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const tasks = await data.json();
  console.log(tasks.length);
  for (let i = 0; i < tasks.length; i++) {
    console.log("--------------------");
    const verifydata = await fetch("https://coinrush.pages.dev/api/verify-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: tasks[i].chat_id, tId: tasks[i].task_id }), // Replace 'your_task_id' with the actual task ID you want to verify
    });
    const verify = await verifydata.json();
    if (verify.error) {
      console.log("Task ID:", tasks[i].task_id, "is not valid.");
    }
    if (verify.success) {
      console.log(verify.success);
    }
  }
})();
