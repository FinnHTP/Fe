import React, { useState, useEffect } from "react";
import {
    loadKeycode,
    addKeycode,
    updateKeycodeStatus,
    viewKeycodes,
    editKeycodes,
} from "../../service/KeyCode.service";
import NavbarAdminComponent from "../../component/NavbarAdmin.Component"; 

function KeycodeComponent() {
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [keycodes, setKeycodes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [keycode, setKeycode] = useState({
        id: "",
        createDate: "",
        isActive: false,
        keycode: "",
        game: { id: "" },
    });

    const token = localStorage.getItem("accesstoken");
    const itemsPerPage = 7;

    useEffect(() => {
        loadKeycode(token).then(setKeycodes);
    }, [token]);

    const handleOpenModal = () => {
        setShowModal(true);
        setIsEditMode(false);
        resetForm();
    };

    const handleCloseModal = () => {
        setShowModal(false);
        resetForm();
    };

    const handleSaveKeycode = async (e) => {
        e.preventDefault();
        if (isEditMode) {
            await editKeycodes(keycode.id, keycode, token);
        } else {
            await addKeycode(keycode, token);
        }
        loadKeycode(token).then(setKeycodes);
        handleCloseModal();
    };

    const handleOpenEditModal = (id) => {
        viewKeycodes(id, token).then((data) => {
            if (data.createDate) {
                const date = new Date(data.createDate);
                data.createDate = date.toISOString().split('T')[0]; 
            }
            setKeycode(data);
            setShowModal(true);
            setIsEditMode(true);
        });
    };

    const handleDeleteKeycode = async (id) => {
        await updateKeycodeStatus(id, token);
        loadKeycode(token).then(setKeycodes);
    };

    const onInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setKeycode((prevState) => ({
            ...prevState,
            [name]: newValue,
        }));
    };

    const resetForm = () => {
        setKeycode({
            id: "",
            createDate: "",
            isActive: false,
            keycode: "",
            game: { id: "" },
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

 
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = keycodes.slice(indexOfFirstItem, indexOfLastItem);


    const totalPages = Math.ceil(keycodes.length / itemsPerPage);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 mx-1 rounded ${
                        i === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"
                    }`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="flex">
            <div className="w-1/4">
                <NavbarAdminComponent /> 
            </div>
            <div className="w-3/4 container mx-auto px-4">
                <div className="my-4">
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                        onClick={handleOpenModal}
                    >
                        Add Keycode
                    </button>
                </div>

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                            <h2 className="text-xl font-bold mb-4">
                                {isEditMode ? "Edit Keycode" : "Add Keycode"}
                            </h2>
                            <form onSubmit={handleSaveKeycode}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Create Date</label>
                                    <input
                                        type="date"
                                        name="createDate"
                                        value={keycode.createDate}
                                        onChange={onInputChange}
                                        className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Status</label>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="isActive"
                                            checked={keycode.isActive}
                                            onChange={onInputChange}
                                            className="mr-2"
                                        />
                                        <span>Done</span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Keycode</label>
                                    <input
                                        type="text"
                                        name="keycode"
                                        value={keycode.keycode}
                                        onChange={onInputChange}
                                        className="px-4 py-2 border border-gray-300 rounded-md w-full"
                                        placeholder="Enter keycode"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Game ID</label>
                                    <input
                                        type="text"
                                        name="gameId"
                                        value={keycode.game.id}
                                        onChange={(e) =>
                                            setKeycode((prevState) => ({
                                                ...prevState,
                                                game: { id: e.target.value },
                                            }))
                                        }
                                        className="px-4 py-2 border border-gray-300 rounded-md w-full"
                                        placeholder="Enter Game ID"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                                    >
                                        {isEditMode ? "Save" : "Add"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full bg-gray-800 text-gray-300 border border-gray-300 rounded-md">
                        <thead className="bg-customBgBrowse py-2 rounded-2xl">
                            <tr>
                                <th className="px-6 py-3 border-b">No</th>
                                <th className="px-6 py-3 border-b">Create Date</th>
                                <th className="px-6 py-3 border-b">Status</th>
                                <th className="px-6 py-3 border-b">Keycode</th>
                                <th className="px-6 py-3 border-b">Game ID</th>
                                <th className="px-6 py-3 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((kc, index) => (
                                <tr key={kc.id}>
                                    <td className="px-6 py-4 border-b">{indexOfFirstItem + index + 1}</td>
                                    <td className="px-6 py-4 border-b">{formatDate(kc.createDate)}</td>
                                    <td className="px-6 py-4 border-b">
                                        {kc.isActive ? "Done" : "Disable"}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {kc.keycode || "No info"}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {kc.game?.id || "No info"}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        <button
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                                            onClick={() => handleOpenEditModal(kc.id)}
                                        >
                                            <img src="/image/icons/pencil.png" alt="Edit" className="w-6 h-6" />
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-red-500 text-white rounded-md"
                                            onClick={() => handleDeleteKeycode(kc.id)}
                                        >
                                             <img src="/image/icons/delete.png" alt="Delete" className="w-6 h-6" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

              
                <div className="flex justify-center mt-4">
                    {renderPageNumbers()}
                </div>
            </div>
        </div>
    );
}

export default KeycodeComponent;
