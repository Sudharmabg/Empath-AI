import { useState, useEffect } from 'react'
import { PlusIcon, TrashIcon, PencilIcon, ChevronDownIcon, ChevronRightIcon, FolderIcon, FolderPlusIcon } from '@heroicons/react/24/outline'

export default function AssessmentManagement() {
    const [questions, setQuestions] = useState([
        {
            id: 1,
            text: 'How are you feeling today?',
            options: ['Very Happy 😊', 'Happy 🙂', 'Okay 😐', 'Sad 😢'],
            groups: ['Daily Check-in']
        },
        {
            id: 2,
            text: 'How well did you sleep last night?',
            options: ['Very Well 😴', 'Good 😌', 'Not Great 😪', 'Poorly 😫'],
            groups: ['Daily Check-in']
        },
        {
            id: 3,
            text: 'How confident do you feel about your studies?',
            options: ['Very Confident 💪', 'Confident 👍', 'Somewhat Confident 🤔', 'Not Confident 😟'],
            groups: ['Class 8th']
        },
    ])

    const [groups, setGroups] = useState([
        { id: 'Daily Check-in', name: 'Daily Check-in', color: 'purple', isDefault: true },
        { id: 'Class 8th', name: 'Class 8th Standard', color: 'green', isDefault: true },
        { id: 'Class 9th', name: 'Class 9th Standard', color: 'blue', isDefault: true },
        { id: 'Class 10th', name: 'Class 10th Standard', color: 'indigo', isDefault: true },
        
        
    ])
    const [studentResponses, setStudentResponses] = useState([])
    const [selectedResponse, setSelectedResponse] = useState(null)
    const [showResponseSheet, setShowResponseSheet] = useState(false)
    const [isResponseModalOpen, setIsResponseModalOpen] = useState(false) 
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [expandedQuestion, setExpandedQuestion] = useState(null)
    const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false)
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false)
    const [editingQuestion, setEditingQuestion] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterAge, setFilterAge] = useState('')
    const [filterClass, setFilterClass] = useState('')
    const [filterGender, setFilterGender] = useState('')

    const [questionFormData, setQuestionFormData] = useState({
        text: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        groups: [],
        
    })

    const [groupFormData, setGroupFormData] = useState({
        name: '',
        color: 'purple'
    })
 

//TEST PURPOSES - REMOVE LATER
useEffect(() => {
    setStudentResponses([
        { studentId: '1', groupId: 'Class 8th', emotion: 'positive' },
        { studentId: '2', groupId: 'Class 8th', emotion: 'positive' },
        { studentId: '3', groupId: 'Class 8th', emotion: 'positive' },
        { studentId: '4', groupId: 'Class 8th', emotion: 'negative' },
        { studentId: '1', groupId: 'Class 9th', emotion: 'positive' },
        { studentId: '2', groupId: 'Class 9th', emotion: 'neutral' },
        { studentId: '3', groupId: 'Class 9th', emotion: 'neutral' },
        { studentId: '4', groupId: 'Class 9th', emotion: 'negative' },


        { studentId: '1', name: 'Rahul', age: 14, className: 'Class 9th', sex: 'Male', questionId: 1, answer: 'Very Happy 😊' },
        { studentId: '2', name: 'Ananya', age: 13, className: 'Class 9th', sex: 'Female', questionId: 1, answer: 'Sad 😢' },
        { studentId: '7', name: 'Ritu', age: 14, className: 'Class 8th', sex: 'Female', questionId: 3, answer: 'Very Confident 💪' },
        { studentId: '4', name: 'Anay', age: 13, className: 'Class 8th', sex: 'Male', questionId: 2, answer: 'Not Great 😪' },
        { studentId: '5', name: 'Raj', age: 14, className: 'Class 8th', sex: 'Male', questionId: 1, answer: 'Very Happy 😊' },
        { studentId: '5', name: 'Raj', age: 14, className: 'Class 8th', sex: 'Male', questionId: 1, answer: 'Sad 😢' },
        { studentId: '6', name: 'Rahul', age: 14, className: 'Class 9th', sex: 'Male', questionId: 2, answer: 'Good 😌' },
        { studentId: '8', name: 'Ritu', age: 14, className: 'Daily Check-in', sex: 'Female', questionId: 3, answer: 'Very Confident 💪' },
    
    





        
    ])
}, [])


    const colorOptions = [
        { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
        { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
        { value: 'green', label: 'Green', class: 'bg-green-500' },
        { value: 'yellow', label: 'Yellow', class: 'bg-yellow-500' },
        { value: 'red', label: 'Red', class: 'bg-red-500' },
        { value: 'pink', label: 'Pink', class: 'bg-pink-500' },
        { value: 'indigo', label: 'Indigo', class: 'bg-indigo-500' },
        { value: 'yellow', label: 'Orange', class: 'bg-orange-500' },
    ]

    const getColorClasses = (color) => {
        const colorMap = {
            purple: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200', hover: 'hover:bg-purple-50' },
            blue: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200', hover: 'hover:bg-blue-50' },
            green: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', hover: 'hover:bg-green-50' },
            yellow: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200', hover: 'hover:bg-yellow-50' },
            red: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', hover: 'hover:bg-red-50' },
            pink: { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-200', hover: 'hover:bg-pink-50' },
            indigo: { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200', hover: 'hover:bg-indigo-50' },
            orange: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200', hover: 'hover:bg-orange-50' },
        }
        return colorMap[color] || colorMap.purple
    }



    const detectEmotion = (optionText) => {
    const text = optionText.toLowerCase()

    if (
        text.includes('very happy') ||
        text.includes('happy') ||
        text.includes('confident') ||
        text.includes('very well')
    ) return 'positive'

    if (
        text.includes('okay') ||
        text.includes('somewhat') ||
        text.includes('neutral')
    ) return 'neutral'

    return 'negative'
}    



    const handleOpenQuestionModal = (question = null) => {
        if (question) {
            setEditingQuestion(question)
            setQuestionFormData({
                text: question.text,
                option1: question.options[0] || '',
                option2: question.options[1] || '',
                option3: question.options[2] || '',
                option4: question.options[3] || '',
                groups: question.groups || []
            })
        } else {
            setEditingQuestion(null)
            setQuestionFormData({
                text: '',
                option1: '',
                option2: '',
                option3: '',
                option4: '',
                groups: selectedGroup ? [selectedGroup] : []
            })
        }
        setIsQuestionModalOpen(true)
    }

    const handleOpenGroupModal = () => {
        setGroupFormData({ name: '', color: 'purple' })
        setIsGroupModalOpen(true)
    }

    const handleSaveQuestion = () => {
        const options = [
            questionFormData.option1,
            questionFormData.option2,
            questionFormData.option3,
            questionFormData.option4
        ].filter(opt => opt.trim())

        if (!questionFormData.text || options.length < 2) {
            alert('Please provide a question and at least 2 options')
            return
        }

        if (editingQuestion) {
            setQuestions(questions.map(q =>
                q.id === editingQuestion.id
                    ? { ...q, text: questionFormData.text, options, groups: questionFormData.groups }
                    : q
            ))
        } else {
const newQuestion = {
    id: Date.now(),
    text: questionFormData.text,
    options,
    groups: questionFormData.groups,
    
}
            setQuestions([...questions, newQuestion])
        }
        setIsQuestionModalOpen(false)
    }

    const handleSaveGroup = () => {
        if (!groupFormData.name.trim()) {
            alert('Please provide a group name')
            return
        }

        const newGroup = {
            id: groupFormData.name,
            name: groupFormData.name,
            color: groupFormData.color,
            isDefault: false
        }
        setGroups([...groups, newGroup])
        setIsGroupModalOpen(false)
    }

    const handleDeleteQuestion = (id) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            setQuestions(questions.filter(q => q.id !== id))
        }
    }

    const handleDeleteGroup = (groupId) => {
        const group = groups.find(g => g.id === groupId)
        if (group.isDefault) {
            alert('Cannot delete default groups')
            return
        }

        const hasQuestions = questions.some(q => q.groups.includes(groupId))
        if (hasQuestions) {
            alert('Cannot delete group with existing questions. Please delete or reassign questions first.')
            return
        }

        if (window.confirm(`Are you sure you want to delete the group "${group.name}"?`)) {
            setGroups(groups.filter(g => g.id !== groupId))
            if (selectedGroup === groupId) {
                setSelectedGroup(null)
            }
        }
    }

    const toggleQuestion = (id) => {
        setExpandedQuestion(expandedQuestion === id ? null : id)
    }

const handleOptionClick = (question, option) => {
    const emotion = detectEmotion(option)

    const newResponse = {
        studentId: 'currentStudent',
        groupId: selectedGroup,
        questionId: question.id,
        emotion,
        answer: option,
        date: new Date().toISOString()
    }

    setStudentResponses(prev => {
        // Remove previous answer of same student for same question
        const filtered = prev.filter(
            r =>
                !(
                    r.studentId === 'currentStudent' &&
                    r.questionId === question.id
                )
        )

        // Add latest answer
        return [...filtered, newResponse]
    })

    setSelectedResponse(newResponse)
    setIsResponseModalOpen(true)
}
    const getGroupQuestions = (groupId) => {
        return questions.filter(q => q.groups.includes(groupId))
    }

    const filteredQuestions = selectedGroup
        ? questions.filter(q => q.groups.includes(selectedGroup))
        : questions

    const searchedQuestions = filteredQuestions.filter(q => {
        if (!searchTerm) return true
        return q.text.toLowerCase().includes(searchTerm.toLowerCase())
    })




const isDailyCheckinSelected =
    selectedGroup === 'Daily Check-in'

const isStudentResponsesSelected =
    selectedGroup === 'Student Responses'
const isMainPage = !selectedGroup



// Total responses (all groups)
const totalAllResponses = studentResponses.length

// Total negative responses (all groups)
const totalNegativeResponses = studentResponses.filter(
    r => r.emotion === 'negative'
).length

// Last added question
const lastQuestion =
    questions.length > 0 ? questions[questions.length - 1] : null



const getOptionCount = (questionId, option) => {
    return studentResponses.filter(
        response =>
            response.questionId === questionId &&
            response.answer === option
    ).length
}



const getQuestionLabel = (questionId) => {
    const index = questions.findIndex(q => q.id === questionId)
    return index !== -1 ? `Q${index + 1}` : "-"
}

// Get unique students
const uniqueStudents = Array.from(
    new Map(
        studentResponses
            .filter(r => r.questionId)
            .map(r => [r.studentId, r])
    ).values()
)
// Filter students based on admin filters
const filteredStudents = uniqueStudents.filter(student => {
    const matchesAge = filterAge ? student.age == filterAge : true
    const matchesClass = filterClass ? student.className.toLowerCase().includes(filterClass.toLowerCase()) : true
    const matchesGender = filterGender ? student.sex.toLowerCase().startsWith(filterGender.toLowerCase()) : true
    return matchesAge && matchesClass && matchesGender
})
const classStudents = filteredStudents.filter(
student => student.className === selectedGroup
)
{/*Reponse full*/}
const getStudentAnswer = (studentId, questionId) => {
    const response = studentResponses.find(
        r => r.studentId === studentId && r.questionId === questionId
    )

    if (!response) return "-"

    const question = questions.find(q => q.id === questionId)
    if (!question) return "-"

    const optionIndex = question.options.indexOf(response.answer)

    if (optionIndex === -1) return "-"

    const letter = String.fromCharCode(65 + optionIndex) 
    const fullAnswer = question.options[optionIndex]

    return `${letter} - ${fullAnswer}`
}

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">Feelings Explorer</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            {selectedGroup
                                ? `Managing questions for: ${groups.find(g => g.id === selectedGroup)?.name}`
                                : 'Select a group to view and manage questions'}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <select
    className="border border-gray-300 rounded-md shadow-sm text-sm font-medium px-3 py-2 text-sm focus:ring-purple-500 focus:border-purple-500"
>
    <option>Today</option>
    <option>This Week</option>
    <option>This Month</option>
</select>

                        <button
                            onClick={() => handleOpenQuestionModal()}
                            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            <PlusIcon className="w-5 h-5 mr-2" />
                            Add Question
                        </button>
                        <button
                            onClick={handleOpenGroupModal}
                            className="flex items-center px-4 py-2 border border-purple-600 text-purple-600 rounded-md shadow-sm text-sm font-medium hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            <FolderPlusIcon className="w-5 h-5 mr-2" />
                            Create Group
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Groups Grid */}
            <div className="mb-8">
                <h4 className="text-sm font-semibold text-gray-700 uppercase mb-3">Question Groups</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {groups.map((group) => {
                        const questionCount = getGroupQuestions(group.id).length
                        const colors = getColorClasses(group.color)
                        const isSelected = selectedGroup === group.id

                        return (
                            <div
                                key={group.id}
                                onClick={() => {
setSelectedGroup(group.id)
setExpandedQuestion(null)
setShowResponseSheet(false)
}}
                                className={`
                  relative p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${isSelected
                                        ? `${colors.border} ${colors.bg} shadow-md`
                                        : `border-gray-200 bg-white hover:shadow-md ${colors.hover}`}
                `}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center">
                                        <FolderIcon className={`w-5 h-5 mr-2 ${colors.text}`} />
                                        <h5 className={`font-medium text-sm ${isSelected ? colors.text : 'text-gray-900'}`}>
                                            {group.name}
                                        </h5>
                                    </div>
                                    {!group.isDefault && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleDeleteGroup(group.id)
                                            }}
                                            className="text-gray-400 hover:text-red-600"
                                            title="Delete Group"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">
                                       {group.id !== 'Student Responses' && (
    <>
      {questionCount} {questionCount === 1 ? 'question' : 'questions'}
    </>
  )}
</span>
                                    {isSelected && (
                                        <span className={`text-xs font-semibold ${colors.text}`}>Selected</span>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Questions Section */}
            {selectedGroup && !isStudentResponsesSelected &&(
                <div>
 <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">

<h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
Questions in {groups.find(g => g.id === selectedGroup)?.name}
</h4>

<button
onClick={() => setShowResponseSheet(true)}
className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
>
View Responses
</button>

</div>
                   

                    {/* Search Bar */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search questions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                    </div>

                    {/* Questions List */}
                    <div className="space-y-3">
                        {searchedQuestions.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">
                                    {searchTerm ? `No questions found for "${searchTerm}"` : 'No questions in this group yet.'}
                                </p>
                                <button
                                    onClick={() => handleOpenQuestionModal()}
                                    className="mt-4 text-purple-600 hover:text-purple-700 text-sm font-medium"
                                >
                                    Add your first question
                                </button>
                            </div>
                        ) : (
                            searchedQuestions.map((question, index) => (
                                <div key={question.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                    <div className="p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start flex-1">
                                                <button
                                                    onClick={() => toggleQuestion(question.id)}
                                                    className="mr-3 mt-1 text-gray-400 hover:text-gray-600"
                                                >
                                                    {expandedQuestion === question.id ? (
                                                        <ChevronDownIcon className="w-5 h-5" />
                                                    ) : (
                                                        <ChevronRightIcon className="w-5 h-5" />
                                                    )}
                                                </button>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs font-semibold text-gray-500">Q{index + 1}</span>
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-900">{question.text}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 ml-4">
                                                <button
                                                    onClick={() => handleOpenQuestionModal(question)}
                                                    className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-md"
                                                    title="Edit Question"
                                                >
                                                    <PencilIcon className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteQuestion(question.id)}
                                                    className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md"
                                                    title="Delete Question"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Expanded Options */}
                                        {expandedQuestion === question.id && (
                                            <div className="mt-4 pl-8 pt-3 border-t border-gray-100">
                                                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Answer Options:</p>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                   {question.options.map((option, idx) => (
    <div key={idx} className="flex flex-col">

        <div
            onClick={() => handleOptionClick(question, option)}
            className="flex items-center p-2 bg-purple-50 rounded-md cursor-pointer hover:bg-purple-100 transition"
        >
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-purple-200 text-purple-700 rounded-full text-xs font-bold mr-2">
                {idx + 1}
            </span>
            <span className="text-sm text-gray-700">{option}</span>
        </div>

        {/*  Student Count */}
        <span className="text-xs text-gray-500 ml-8 mt-1">
            {getOptionCount(question.id, option)} students selected this
        </span>

    </div>
))}


                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Add/Edit Question Modal */}
            {isQuestionModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsQuestionModalOpen(false)}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                    {editingQuestion ? 'Edit Question' : 'Add New Question'}
                                </h3>

                                <div className="space-y-4">
                                    {/* Question Text */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Question Text
                                        </label>
                                        <textarea
                                            value={questionFormData.text}
                                            onChange={(e) => setQuestionFormData({ ...questionFormData, text: e.target.value })}
                                            rows="2"
                                            placeholder="e.g., How are you feeling today?"
                                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                        />
                                    </div>

                                    {/* Group Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Assign to Groups
                                        </label>
                                        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border border-gray-200 rounded-md">
                                            {groups.map(group => (
                                                <label key={group.id} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={questionFormData.groups.includes(group.id)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setQuestionFormData(prev => ({ ...prev, groups: [...prev.groups, group.id] }))
                                                            } else {
                                                                setQuestionFormData(prev => ({ ...prev, groups: prev.groups.filter(id => id !== group.id) }))
                                                            }
                                                        }}
                                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                                    />
                                                    <span className="text-sm text-gray-700">{group.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {questionFormData.groups.length === 0 && (
                                            <p className="mt-1 text-xs text-red-500">Please select at least one group.</p>
                                        )}
                                    </div>

                                    {/* Answer Options */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Answer Options (4 options)
                                        </label>
                                        <div className="space-y-2">
                                            {[1, 2, 3, 4].map((num) => (
                                                <div key={num} className="flex items-center">
                                                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-purple-100 text-purple-700 rounded-full text-xs font-bold mr-2">
                                                        {num}
                                                    </span>
                                                    <input
                                                        type="text"
                                                        value={questionFormData[`option${num}`]}
                                                        onChange={(e) => setQuestionFormData({ ...questionFormData, [`option${num}`]: e.target.value })}
                                                        placeholder={`Option ${num} (e.g., Very Happy 😊)`}
                                                        className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <p className="mt-2 text-xs text-gray-500">
                                            💡 Tip: You can use emojis to make options more engaging!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                <button
                                    type="button"
                                    onClick={handleSaveQuestion}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:col-start-2 sm:text-sm"
                                >
                                    {editingQuestion ? 'Update' : 'Add'} Question
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsQuestionModalOpen(false)}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


{/* Response Sheet */}
{showResponseSheet && (
<div className="mt-8 bg-white border border-gray-200 rounded-lg shadow-sm p-4">

<div className="flex justify-between items-center mb-4">
<h4 className="text-sm font-semibold text-gray-700 uppercase">
Student Responses - {selectedGroup}
</h4>
<button
onClick={() => setShowResponseSheet(false)}
className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
>
✕ Close
</button>

</div>


{/* Gender Filter */}
  <div className="flex-1  mb-6">
    <label className="text-xs font-semibold text-gray-600 mb-1 block">Gender</label>
    <div className="flex flex-wrap gap-2">
      {filterGender ? (
        <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          Gender: {filterGender.charAt(0).toUpperCase() + filterGender.slice(1)} 
          <button
            className="ml-1 text-blue-600 font-bold"
            onClick={() => setFilterGender('')}
          >×</button>
        </span>
      ) : null}
     <div className="flex-1">
 

  <div className="flex items-center gap-3">

    {/* Male Button */}
    <button
      onClick={() =>
        setFilterGender(filterGender === 'male' ? '' : 'male')
      }
      className={`
        px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
        border
        ${filterGender === 'male'
          ? 'bg-blue-500 text-white border-blue-500 shadow-md scale-105'
          : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'}
      `}
    >
      ♂ Male
    </button>

    {/* Female Button */}
    <button
      onClick={() =>
        setFilterGender(filterGender === 'female' ? '' : 'female')
      }
      className={`
        px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
        border
        ${filterGender === 'female'
          ? 'bg-pink-500 text-white border-pink-500 shadow-md scale-105'
          : 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100'}
      `}
    >
      ♀ Female
    </button>

    {/* Reset Button (Optional Small One) */}
    {filterGender && (
      <button
  onClick={() => {
    setFilterAge('')
    setFilterClass('')
    setFilterGender('')
  }}
  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200"
>
  Clear Filters
</button>
    )}

  </div>
    </div>
  </div>




</div>

{/* Excel Table */}
<div className="overflow-x-auto mt-4">
<table className="min-w-full border border-gray-300 text-gray-800">

<thead className="bg-gray-200 text-sm font-semibold sticky top-0">

<tr>
<th className="border px-4 py-2 text-left">Questions</th>

{classStudents.map((student, index) => (
<th key={student.studentId} className="border px-4 py-2">
R{index + 1}
</th>
))}

</tr>

</thead>

<tbody className="text-sm">

{/* Age */}
{selectedGroup === 'Daily Check-in' && (
<tr>
<td className="border px-4 py-2 font-medium">Age</td>

{classStudents.map(student => (
<td key={student.studentId} className="border px-4 py-2">
{student.age}
</td>
))}

</tr>
)}
{/* Class */}
{selectedGroup === 'Daily Check-in' && (
<tr>
<td className="border px-4 py-2 font-medium">Class</td>

{classStudents.map(student => (
<td key={student.studentId} className="border px-4 py-2">
{student.className}
</td>
))}

</tr>
)}

{/* Name */}
<tr>
<td className="border px-4 py-2 font-medium">Name</td>
{classStudents.map(student => (
<td key={student.studentId} className="border px-4 py-2">
{student.name}
</td>
))}
</tr>

{/* Gender */}
<tr>
<td className="border px-4 py-2 font-medium">Gender</td>
{classStudents.map(student => (
<td key={student.studentId} className="border px-4 py-2">
{student.sex}
</td>
))}
</tr>

{/* Questions */}
{questions
.filter(q => q.groups.includes(selectedGroup))
.map((question, qIndex) => (

<tr key={question.id}>

<td className="border px-4 py-2 font-medium">
{qIndex + 1}. {question.text}
</td>

{classStudents.map(student => (

<td key={student.studentId} className="border px-4 py-2 text-center">

{getStudentAnswer(student.studentId, question.id)}

</td>

))}

</tr>

))}

</tbody>

</table>

</div>

</div>
)}


            {/* Create Group Modal */}
            {isGroupModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="group-modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsGroupModalOpen(false)}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="group-modal-title">
                                    Create New Group
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Group Name
                                        </label>
                                        <input
                                            type="text"
                                            value={groupFormData.name}
                                            onChange={(e) => setGroupFormData({ ...groupFormData, name: e.target.value })}
                                            placeholder="e.g., Weekly Reflection"
                                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Color Theme
                                        </label>
                                        <div className="grid grid-cols-4 gap-2">
                                            {colorOptions.map((color) => (
                                                <button
                                                    key={color.value}
                                                    type="button"
                                                    onClick={() => setGroupFormData({ ...groupFormData, color: color.value })}
                                                    className={`
                            p-3 rounded-md border-2 transition-all
                            ${groupFormData.color === color.value
                                                            ? 'border-gray-900 ring-2 ring-gray-900'
                                                            : 'border-gray-200 hover:border-gray-400'}
                          `}
                                                >
                                                    <div className={`w-full h-6 rounded ${color.class}`}></div>
                                                    <p className="text-xs mt-1 text-center text-gray-600">{color.label}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                <button
                                    type="button"
                                    onClick={handleSaveGroup}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:col-start-2 sm:text-sm"
                                >
                                    Create Group
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsGroupModalOpen(false)}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>     
                        </div>
                    </div>
                </div>
            )}
            


{/* Activity & Alerts Panel */}
{isDailyCheckinSelected && (
  <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Recent Activity
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">

    {totalAllResponses === 0 ? (
        <li>No check-ins recorded yet.</li>
    ) : (
        <li>{totalAllResponses} total check-ins recorded</li>
    )}

    {lastQuestion && (
        <li>
            Latest question added: "{lastQuestion.text}"
        </li>
    )}

    {totalNegativeResponses > 0 && (
        <li className="text-red-600 font-medium">
            {totalNegativeResponses} negative responses detected
        </li>
    )}

</ul>
        </div>

        <div className="bg-red-50 p-4 rounded-lg shadow-sm">
            <h4 className="text-sm font-semibold text-red-700 mb-2">
                Alerts
            </h4>
          <p className="text-sm text-red-600">
    {totalNegativeResponses > 0
        ? `${totalNegativeResponses} students need attention`
        : "No critical alerts"}
</p>


        </div>

    </div>
)}




            {isResponseModalOpen && selectedResponse && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">

            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Response Submitted ✅
            </h3>

            <p className="text-sm text-gray-600 mb-6">
                Your answer:
                <span className="font-medium">
                    {" "}{selectedResponse.answer}
                </span>
            </p>

            <button
                onClick={() => setIsResponseModalOpen(false)}
                className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
                Close
            </button>

        </div>
    </div>
)}

           

        </div>
    
    )
}
