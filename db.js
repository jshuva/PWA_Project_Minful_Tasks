import Dexie from 'dexie';

export const db = new Dexie('TaskManagerDB');

// Define database schema
db.version(1).stores({
    tasks: '++id, description, deadline, createdAt'
});

// Helper functions
export async function addTask(description, deadline) {
    return await db.tasks.add({
        description,
        deadline,
        createdAt: new Date().toISOString()
    });
}

export async function getAllTasks() {
    return await db.tasks.toArray();
}

export async function deleteTask(id) {
    return await db.tasks.delete(id);
}
