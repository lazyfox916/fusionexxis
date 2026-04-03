import Users from "./users.model";
import Tasks from "./tasks.model";

export function initAssociations() {
  Users.hasMany(Tasks, {
    foreignKey: "assignedTo",
    as: "tasks",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Tasks.belongsTo(Users, {
    foreignKey: "assignedTo",
    as: "assignee",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
}
