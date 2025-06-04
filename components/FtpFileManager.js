'use client';

import { useState, useEffect, useRef } from 'react';

export default function FtpFileManager() {
    const [files, setFiles] = useState([]);
    const [path, setPath] = useState('/');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [editFile, setEditFile] = useState(null);
    const [editContent, setEditContent] = useState('');

    const folderInputRef = useRef();
    const newFileRef = useRef();

    const fetchFiles = async (targetPath = path) => {
        const res = await fetch(`/api/ftp/list?path=${encodeURIComponent(targetPath)}`);
        const data = await res.json();
        setFiles(data.files);
        setPath(targetPath);
        setSelectedFiles([]);
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const goUp = () => {
        const parts = path.split('/').filter(Boolean);
        if (parts.length === 0) return;
        const parent = '/' + parts.slice(0, -1).join('/');
        fetchFiles(parent || '/');
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        for (const file of files) {
            const reader = new FileReader();
            reader.onload = async () => {
                await fetch('/api/ftp/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        filename: file.name,
                        content: reader.result.split(',')[1],
                    }),
                });
                fetchFiles();
            };
            reader.readAsDataURL(file);
        }
    };

    const createFolder = async () => {
        const name = folderInputRef.current.value.trim();
        if (!name) return;
        const fullPath = `${path}/${name}`.replace(/\/+/g, '/');
        await fetch('/api/ftp/create-folder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path: fullPath }),
        });
        folderInputRef.current.value = '';
        fetchFiles();
    };

    const createFile = async () => {
        const name = newFileRef.current.value.trim();
        if (!name) return;
        const fullPath = `${path}/${name}`.replace(/\/+/g, '/');
        await fetch(`/api/ftp/file?path=${encodeURIComponent(fullPath)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: '' }),
        });
        newFileRef.current.value = '';
        fetchFiles();
        setTimeout(() => openEditor(name), 300);
    };

    const deleteFolder = async (folderName) => {
        const fullPath = `${path}/${folderName}`.replace(/\/+/g, '/');
        const res = await fetch('/api/ftp/delete-folder', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path: fullPath }),
        });
        if (res.status === 400) {
            alert('❌ Folder nie jest pusty!');
        }
        fetchFiles();
    };

    const openEditor = async (fileName) => {
        const fullPath = `${path}/${fileName}`.replace(/\/+/g, '/');
        const res = await fetch(`/api/ftp/file?path=${encodeURIComponent(fullPath)}`);
        const data = await res.json();
        setEditContent(data.content);
        setEditFile(fullPath);
    };

    const saveEditor = async () => {
        await fetch(`/api/ftp/file?path=${encodeURIComponent(editFile)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: editContent }),
        });
        setEditFile(null);
        fetchFiles();
    };

    const downloadFile = async (filePath) => {
        const res = await fetch('/api/ftp/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path: filePath }),
        });
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filePath.split('/').pop();
        a.click();
        URL.revokeObjectURL(url);
    };

    const downloadZip = async () => {
        const res = await fetch('/api/ftp/download-zip', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ files: selectedFiles }),
        });
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'files.zip';
        a.click();
        URL.revokeObjectURL(url);
    };

    const toggleSelect = (fullPath) => {
        setSelectedFiles((prev) =>
            prev.includes(fullPath)
                ? prev.filter((p) => p !== fullPath)
                : [...prev, fullPath]
        );
    };

    return (
        <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="p-4 max-w-5xl mx-auto bg-white shadow rounded"
        >
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">📂 Katalog: {path}</h2>
                <button onClick={goUp} className="text-blue-600 hover:underline">
                    ⬆️ Wróć wyżej
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex gap-2 items-center">
                    <input
                        ref={folderInputRef}
                        placeholder="Nowy folder"
                        className="border px-2 py-1 rounded w-full"
                    />
                    <button
                        onClick={createFolder}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                        ➕ Folder
                    </button>
                </div>
                <div className="flex gap-2 items-center">
                    <input
                        ref={newFileRef}
                        placeholder="nowy-plik.txt"
                        className="border px-2 py-1 rounded w-full"
                    />
                    <button
                        onClick={createFile}
                        className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800"
                    >
                        ➕ Plik
                    </button>
                </div>
            </div>

            <table className="w-full table-auto border mb-4 text-sm">
                <thead className="bg-gray-100">
                <tr>
                    <th className="p-2 text-left">Nazwa</th>
                    <th className="p-2 text-left">Typ</th>
                    <th className="p-2 text-left">Akcje</th>
                </tr>
                </thead>
                <tbody>
                {files.map((file) => {

                    console.log(file.type);

                    const fullPath = `${path}/${file.name}`.replace(/\/+/g, '/');
                    const isDir = file.type === 2;
                    return (
                        <tr key={file.name} className="border-b">
                            <td className="p-2">
                                {isDir ? (
                                    <span
                                        className="text-blue-600 cursor-pointer"
                                        onClick={() => fetchFiles(fullPath)}
                                    >
                      📁 {file.name}
                    </span>
                                ) : (
                                    <label className="cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            onChange={() => toggleSelect(fullPath)}
                                        />
                                        📄 {file.name}
                                    </label>
                                )}
                            </td>
                            <td className="p-2">{isDir ? 'Katalog' : 'Plik'}</td>
                            <td className="p-2 flex gap-2">
                                {!isDir && (
                                    <>
                                        <button
                                            onClick={() => downloadFile(fullPath)}
                                            className="text-green-600 hover:underline"
                                        >
                                            Pobierz
                                        </button>
                                        <button
                                            onClick={() => openEditor(file.name)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edytuj
                                        </button>
                                    </>
                                )}
                                {isDir && (
                                    <button
                                        onClick={() => deleteFolder(file.name)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Usuń
                                    </button>
                                )}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>

            {selectedFiles.length > 0 && (
                <button
                    onClick={downloadZip}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    📦 Pobierz zaznaczone jako ZIP
                </button>
            )}

            {editFile && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded shadow max-w-3xl w-full">
                        <h3 className="font-bold text-lg mb-2">
                            📝 Edycja: {editFile.split('/').pop()}
                        </h3>
                        <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full h-64 border p-2 font-mono text-sm"
                        />
                        <div className="mt-2 flex justify-end gap-2">
                            <button onClick={saveEditor} className="bg-blue-600 text-white px-3 py-1 rounded">
                                💾 Zapisz
                            </button>
                            <button onClick={() => setEditFile(null)} className="text-red-500">
                                Anuluj
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
