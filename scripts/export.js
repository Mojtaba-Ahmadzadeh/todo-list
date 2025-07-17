import { todos } from "./todo.js";

// Filter for deletions
function getExportableTodos() {
    return todos.filter(todo => !todo.deleted);
}

// JSON output
export function exportAsJSON() {
    const dataStr = JSON.stringify(getExportableTodos(), null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "todos.json";
    a.click();
    URL.revokeObjectURL(url);
}

// CSV output
export function exportAsCSV() {
    const rows = [["عنوان", "توضیحات", "سختی", "رنگ", "انجام‌شده"]];
    getExportableTodos().forEach(todo => {
        rows.push([
            `"${todo.text}"`,
            `"${todo.description || ""}"`,
            todo.difficulty,
            todo.color,
            todo.completed ? "بله" : "خیر"
        ]);
    });

    const csvContent = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "todos.csv";
    a.click();
    URL.revokeObjectURL(url);
}

// PDF output
export function exportAsPDF() {
    const { jsPDF } = window.jspdf; // 👈 حالا به jsPDF دسترسی داری

    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(12);

    const todosToExport = getExportableTodos();
    let y = 10;

    todosToExport.forEach((todo, index) => {
        doc.text(`${index + 1}. ${todo.text}`, 10, y);
        y += 7;
        if (todo.description) {
            doc.text(`توضیح: ${todo.description}`, 15, y);
            y += 7;
        }
        doc.text(
            `سختی: ${todo.difficulty} | رنگ: ${todo.color || "ندارد"} | انجام شده: ${todo.completed ? "بله" : "خیر"
            }`,
            15,
            y
        );
        y += 10;
    });

    doc.save("todos.pdf");
}
