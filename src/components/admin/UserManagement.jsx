import { useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon, UserPlusIcon, ChevronDownIcon, ChevronRightIcon, MagnifyingGlassIcon, KeyIcon, ArrowLeftIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline'

export default function UserManagement() {
    const [activeTab, setActiveTab] = useState('student')
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedSchool, setSelectedSchool] = useState(null)
    const [resetPasswordUser, setResetPasswordUser] = useState(null)
    const [newPassword, setNewPassword] = useState('')
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'Aarav Sharma',
            email: 'aarav.sharma@example.com',
            role: 'student',
            class: '4th Standard',
            school: 'TIGPS',
            parentName: 'Rajesh Sharma',
            phoneNumber: '+91 98765 43210',
            dateOfBirth: '2014-05-15',
            address: 'Sector 12, Dwarka, New Delhi',
            bloodGroup: 'O+',
            emergencyContact: '+91 98765 43211'
        },
        {
            id: 2,
            name: 'Diya Patel',
            email: 'diya.patel@example.com',
            role: 'student',
            class: '5th Standard',
            school: 'TIGWS',
            parentName: 'Amit Patel',
            phoneNumber: '+91 98123 45678',
            dateOfBirth: '2013-08-22',
            address: 'Andheri West, Mumbai',
            bloodGroup: 'A+',
            emergencyContact: '+91 98123 45679'
        },
        {
            id: 101,
            name: 'Rohan Gupta',
            email: 'rohan.gupta@example.com',
            role: 'student',
            class: '6th Standard',
            school: 'TIGPS',
            parentName: 'Suresh Gupta',
            phoneNumber: '+91 98765 43222'
        },
        {
            id: 102,
            name: 'Ananya Singh',
            email: 'ananya.singh@example.com',
            role: 'student',
            class: '4th Standard',
            school: 'TIGWS',
            parentName: 'Vikram Singh',
            phoneNumber: '+91 98765 43333'
        },
        {
            id: 103,
            name: 'Ishaan Kumar',
            email: 'ishaan.kumar@example.com',
            role: 'student',
            class: '5th Standard',
            school: 'TIGPS',
            parentName: 'Meera Kumar',
            phoneNumber: '+91 98765 43444'
        },
        {
            id: 3,
            name: 'Priya Reddy',
            email: 'priya.reddy@example.com',
            role: 'school_admin',
            school: 'Delhi Public School',
            phoneNumber: '+91 99887 76655'
        },
        {
            id: 4,
            name: 'Dr. Arjun Menon',
            email: 'arjun.menon@example.com',
            role: 'psychologist',
            license: 'PSY-MH-2019-12345',
            phoneNumber: '+91 98234 56789'
        },
        {
            id: 5,
            name: 'Kavya Iyer',
            email: 'kavya.iyer@example.com',
            role: 'content_admin',
            department: 'Curriculum',
            phoneNumber: '+91 97654 32109'
        },
    ])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingUser, setEditingUser] = useState(null)
    const [expandedRow, setExpandedRow] = useState(null)

    // Modal form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'student',
        password: '',
        class: '',
        school: '',
        parentName: '',
        phoneNumber: '',
        dateOfBirth: '',
        address: '',
        bloodGroup: '',
        emergencyContact: '',
        license: '',
        department: '',
    })

    // 🎯 Detail Item Component with Emoji Support
    const DetailItem = ({ emoji, label, value }) => (
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1 flex items-center gap-2">
                <span>{emoji}</span>
                {label}
            </p>
            <p className="text-sm font-semibold text-gray-800">
                {value || "N/A"}
            </p>
        </div>
    )

    const generatePassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
        let pass = ''
        for (let i = 0; i < 12; i++) {
            pass += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setFormData(prev => ({ ...prev, password: pass }))
    }

    const handleOpenModal = (user = null) => {
        if (user) {
            setEditingUser(user)
            setFormData({
                ...user,
                password: '',
            })
        } else {
            setEditingUser(null)
            setFormData({
                name: '',
                email: '',
                role: activeTab,
                password: '',
                class: '',
                school: activeTab === 'student' && selectedSchool ? selectedSchool : '',
                parentName: '',
                phoneNumber: '',
                dateOfBirth: '',
                address: '',
                bloodGroup: '',
                emergencyContact: '',
                license: '',
                department: '',
            })
            generatePassword()
        }
        setIsModalOpen(true)
    }

    const handleSaveUser = () => {
        if (editingUser) {
            setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u))
        } else {
            const newUser = {
                id: Date.now(),
                ...formData,
            }
            setUsers([...users, newUser])
        }
        setIsModalOpen(false)
    }

    const handleDeleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(u => u.id !== id))
        }
    }

    const toggleRow = (userId) => {
        setExpandedRow(expandedRow === userId ? null : userId)
    }

    const handleResetPassword = (user) => {
        setResetPasswordUser(user)
        generatePasswordForReset()
    }

    const generatePasswordForReset = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
        let pass = ''
        for (let i = 0; i < 12; i++) {
            pass += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setNewPassword(pass)
    }

    const confirmResetPassword = () => {
        if (resetPasswordUser && newPassword) {
            setUsers(users.map(u =>
                u.id === resetPasswordUser.id
                    ? { ...u, password: newPassword }
                    : u
            ))
            alert(`Password reset successfully for ${resetPasswordUser.name}!\nNew Password: ${newPassword}\n\nPlease save this password securely.`)
            setResetPasswordUser(null)
            setNewPassword('')
        }
    }

    const filteredUsers = users
        .filter(u => u.role === activeTab)
        .filter(u => !selectedSchool || u.school === selectedSchool)
        .filter(u => {
            if (!searchTerm) return true
            const search = searchTerm.toLowerCase()
            return (
                u.name.toLowerCase().includes(search) ||
                u.email.toLowerCase().includes(search) ||
                (u.school && u.school.toLowerCase().includes(search)) ||
                (u.parentName && u.parentName.toLowerCase().includes(search)) ||
                (u.phoneNumber && u.phoneNumber.includes(search))
            )
        })

    const roles = [
        { id: 'student', label: 'Students' },
        { id: 'school_admin', label: 'School Admin' },
        { id: 'psychologist', label: 'Psychologists' },
        { id: 'content_admin', label: 'Content Admins' },
    ]

    const addButtonLabels = {
        student: "Add Students",
        school_admin: "Add School Admins",
        psychologist: "Add Psychologists",
        content_admin: "Add Content Admins",
    };

    const roleTitles = {
        student: "Student",
        school_admin: "School Admin",
        psychologist: "Psychologist",
        content_admin: "Content Admin",
    };

    return (
        <div>
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    {roles.map((role) => (
                        <button
                            key={role.id}
                            onClick={() => {
                                setActiveTab(role.id)
                                setExpandedRow(null)
                                setSelectedSchool(null)
                            }}
                            className={`
                                whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors
                                ${activeTab === role.id
                                    ? 'border-purple-600 text-purple-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                            `}
                        >
                            {role.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Action Bar */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                        {selectedSchool && activeTab === 'student' && (
                            <button
                                onClick={() => setSelectedSchool(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
                            </button>
                        )}
                        <h3 className="text-lg font-medium text-gray-900">
                            {selectedSchool ? `${selectedSchool} Students` : `Manage ${roles.find(r => r.id === activeTab)?.label}`}
                        </h3>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        <UserPlusIcon className="w-5 h-5 mr-2" />
                        {addButtonLabels[activeTab] || "Add User"}
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name, email, school, parent name, or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                            <span className="text-sm">Clear</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Content Area */}
            {activeTab === 'student' && !selectedSchool ? (
                /* School Cards View */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(() => {
                        const studentUsers = users.filter(u => u.role === 'student')
                            .filter(u => !searchTerm ||
                                u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                u.school?.toLowerCase().includes(searchTerm.toLowerCase())
                            );

                        const schoolsMap = {};
                        studentUsers.forEach(u => {
                            const schoolName = u.school || 'Unknown School';
                            if (!schoolsMap[schoolName]) {
                                schoolsMap[schoolName] = { count: 0, students: [] };
                            }
                            schoolsMap[schoolName].count++;
                            schoolsMap[schoolName].students.push(u);
                        });

                        const schoolKeys = Object.keys(schoolsMap);

                        if (schoolKeys.length === 0) {
                            return <div className="col-span-full text-center text-gray-500 py-10">No schools found matching your search.</div>
                        }

                        return schoolKeys.map(schoolName => (
                            <div
                                key={schoolName}
                                onClick={() => setSelectedSchool(schoolName)}
                                className="bg-white overflow-hidden rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer group"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <BuildingLibraryIcon className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div className="bg-purple-50 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">
                                            {schoolsMap[schoolName].count} Students
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{schoolName}</h3>
                                    <p className="text-sm text-gray-500">Click to view student list</p>
                                </div>
                                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                                    <div className="flex -space-x-2 overflow-hidden">
                                        {schoolsMap[schoolName].students.slice(0, 5).map((student, i) => (
                                            <div key={student.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-purple-200 flex items-center justify-center text-xs font-bold text-purple-700" title={student.name}>
                                                {student.name.charAt(0)}
                                            </div>
                                        ))}
                                        {schoolsMap[schoolName].count > 5 && (
                                            <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                                +{schoolsMap[schoolName].count - 5}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ));
                    })()}
                </div>
            ) : (
                /* User Table View */
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {activeTab === 'student' && (
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                                                </th>
                                            )}
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            {activeTab === 'student' && (
                                                <>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
                                                </>
                                            )}
                                            {activeTab === 'school_admin' && (
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
                                            )}
                                            {activeTab === 'psychologist' && (
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License ID</th>
                                            )}
                                            {activeTab === 'content_admin' && (
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                            )}
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredUsers.length === 0 ? (
                                            <tr>
                                                <td colSpan="7" className="px-6 py-8 text-center">
                                                    <div className="text-gray-500">
                                                        {searchTerm ? (
                                                            <>
                                                                <p className="text-sm font-medium">No results found for "{searchTerm}"</p>
                                                                <p className="text-xs mt-1">Try adjusting your search terms</p>
                                                            </>
                                                        ) : (
                                                            <p className="text-sm">No users found for this role.</p>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredUsers.map((user) => (
                                                <>
                                                    {/* Main Row */}
                                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                                        {activeTab === 'student' && (
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <button
                                                                    onClick={() => toggleRow(user.id)}
                                                                    className="text-gray-400 hover:text-purple-600 transition-colors"
                                                                >
                                                                    <ChevronRightIcon
                                                                        className={`w-5 h-5 transition-transform duration-300 ${
                                                                            expandedRow === user.id
                                                                                ? "rotate-90 text-purple-600"
                                                                                : ""
                                                                        }`}
                                                                    />
                                                                </button>
                                                            </td>
                                                        )}
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-500">{user.email}</div>
                                                        </td>
                                                        {activeTab === 'student' && (
                                                            <>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.class}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.school}</td>
                                                            </>
                                                        )}
                                                        {activeTab === 'school_admin' && (
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.school}</td>
                                                        )}
                                                        {activeTab === 'psychologist' && (
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.license}</td>
                                                        )}
                                                        {activeTab === 'content_admin' && (
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.department}</td>
                                                        )}
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <button
                                                                onClick={() => handleOpenModal(user)}
                                                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                                title="Edit User"
                                                            >
                                                                <PencilIcon className="w-5 h-5 inline" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleResetPassword(user)}
                                                                className="text-purple-600 hover:text-purple-900 mr-3"
                                                                title="Reset Password"
                                                            >
                                                                <KeyIcon className="w-5 h-5 inline" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteUser(user.id)}
                                                                className="text-red-600 hover:text-red-900"
                                                                title="Delete User"
                                                            >
                                                                <TrashIcon className="w-5 h-5 inline" />
                                                            </button>
                                                        </td>
                                                    </tr>

                                                    {/* Animated Expanded Row for Students */}
                                                    {activeTab === 'student' && (
                                                        <tr>
                                                            <td colSpan="6" className="p-0 border-0">
                                                                <div
                                                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                                                        expandedRow === user.id
                                                                            ? "max-h-96 opacity-100"
                                                                            : "max-h-0 opacity-0"
                                                                    }`}
                                                                >
                                                                    {expandedRow === user.id && (
                                                                        <div className="bg-purple-50 px-6 py-6 border-t border-purple-100">
                                                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                                                                <DetailItem
                                                                                    emoji="👨‍👩‍👧"
                                                                                    label="Parent Name"
                                                                                    value={user.parentName}
                                                                                />
                                                                                <DetailItem
                                                                                    emoji="📞"
                                                                                    label="Phone Number"
                                                                                    value={user.phoneNumber}
                                                                                />
                                                                                <DetailItem
                                                                                    emoji="🎂"
                                                                                    label="Date of Birth"
                                                                                    value={user.dateOfBirth}
                                                                                />
                                                                                <DetailItem
                                                                                    emoji="🩸"
                                                                                    label="Blood Group"
                                                                                    value={user.bloodGroup}
                                                                                />
                                                                                <DetailItem
                                                                                    emoji="🚨"
                                                                                    label="Emergency Contact"
                                                                                    value={user.emergencyContact}
                                                                                />
                                                                                <DetailItem
                                                                                    emoji="📍"
                                                                                    label="Address"
                                                                                    value={user.address}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    {editingUser
                                        ? `Edit ${roleTitles[activeTab] || "User"}`
                                        : `Create New ${roleTitles[activeTab] || "User"}`
                                    }
                                </h3>
                                <div className="mt-4 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                                    {/* Basic Fields */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="e.g., Aarav Sharma"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="e.g., aarav.sharma@example.com"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Password Gen */}
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <input
                                                type="text"
                                                name="password"
                                                id="password"
                                                readOnly={!editingUser}
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-purple-500 focus:border-purple-500 sm:text-sm border-gray-300"
                                                placeholder={editingUser ? "(Unchanged)" : "Generate a password"}
                                            />
                                            <button
                                                type="button"
                                                onClick={generatePassword}
                                                className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                                            >
                                                Generate
                                            </button>
                                        </div>
                                    </div>

                                    {/* Role Specific Fields */}
                                    {activeTab === 'student' && (
                                        <>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Class</label>
                                                    <select
                                                        value={formData.class}
                                                        onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                                    >
                                                        <option value="">Select Class</option>
                                                        {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'].map(cls => (
                                                            <option key={cls} value={`${cls} Standard`}>{cls} Standard</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">School</label>
                                                    <input
                                                        type="text"
                                                        value={formData.school}
                                                        onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                                                        placeholder="e.g., Delhi Public School"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Parent/Guardian Name</label>
                                                    <input
                                                        type="text"
                                                        value={formData.parentName}
                                                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                                                        placeholder="e.g., Rajesh Sharma"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        value={formData.phoneNumber}
                                                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                                        placeholder="+91 98765 43210"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                                    <input
                                                        type="date"
                                                        value={formData.dateOfBirth}
                                                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                                                    <select
                                                        value={formData.bloodGroup}
                                                        onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                                    >
                                                        <option value="">Select Blood Group</option>
                                                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                                                            <option key={bg} value={bg}>{bg}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                                                <input
                                                    type="tel"
                                                    value={formData.emergencyContact}
                                                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                                                    placeholder="+91 98765 43211"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                                <textarea
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                    rows="2"
                                                    placeholder="e.g., Sector 12, Dwarka, New Delhi"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                                />
                                            </div>
                                        </>
                                    )}
                                    {activeTab === 'school_admin' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">School Name</label>
                                            <input
                                                type="text"
                                                value={formData.school}
                                                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                            />
                                        </div>
                                    )}
                                    {activeTab === 'psychologist' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">License ID</label>
                                            <input
                                                type="text"
                                                value={formData.license}
                                                onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                            />
                                        </div>
                                    )}
                                    {activeTab === 'content_admin' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Department</label>
                                            <select
                                                value={formData.department}
                                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                            >
                                                <option value="">Select Department</option>
                                                <option value="Curriculum">Curriculum</option>
                                                <option value="Assessment">Assessment</option>
                                                <option value="Technical">Technical</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                <button
                                    type="button"
                                    onClick={handleSaveUser}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:col-start-2 sm:text-sm"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Reset Password Modal */}
            {resetPasswordUser && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="reset-modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setResetPasswordUser(null)}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100">
                                    <KeyIcon className="h-6 w-6 text-purple-600" />
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="reset-modal-title">
                                        Reset Password
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Reset password for <span className="font-semibold text-gray-900">{resetPasswordUser.name}</span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700 text-left mb-2">
                                            New Password
                                        </label>
                                        <div className="flex rounded-md shadow-sm">
                                            <input
                                                type="text"
                                                readOnly
                                                value={newPassword}
                                                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-purple-500 focus:border-purple-500 sm:text-sm border-gray-300 bg-gray-50"
                                            />
                                            <button
                                                type="button"
                                                onClick={generatePasswordForReset}
                                                className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                                            >
                                                Regenerate
                                            </button>
                                        </div>
                                        <p className="mt-2 text-xs text-gray-500 text-left">
                                            <strong>Important:</strong> Copy this password before confirming. It will be shown in an alert after reset.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                <button
                                    type="button"
                                    onClick={confirmResetPassword}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:col-start-2 sm:text-sm"
                                >
                                    Confirm Reset
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setResetPasswordUser(null)}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}