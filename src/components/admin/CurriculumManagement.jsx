import { useState, useEffect } from 'react'
import {
    PlusIcon,
    TrashIcon,
    PencilIcon,
    VideoCameraIcon,
    DocumentTextIcon,
    ListBulletIcon,
    QuestionMarkCircleIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    AcademicCapIcon,
    PhotoIcon,
    BookmarkIcon,
    ClockIcon,
    XMarkIcon,
    CheckCircleIcon,
    PlayIcon
} from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'

const CLASS_LEVELS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']

// ── Interactive Quiz Player ──────────────────────────────────────────────────
function QuizPlayer({ quiz, moduleId }) {
    const [answers, setAnswers] = useState({})      // { questionId: selectedIndex }
    const [submitted, setSubmitted] = useState(false)
    const [current, setCurrent] = useState(0)

    if (!quiz || quiz.length === 0) return null

    const q = quiz[current]
    const totalAnswered = Object.keys(answers).length
    const score = quiz.filter(q => answers[q.id] === q.correctAnswer).length

    const handleSelect = (optIdx) => {
        if (submitted) return
        setAnswers(prev => ({ ...prev, [q.id]: optIdx }))
    }

    const handleSubmit = () => setSubmitted(true)
    const handleReset = () => { setAnswers({}); setSubmitted(false); setCurrent(0) }

    const selectedForCurrent = answers[q.id]
    const isAnswered = selectedForCurrent !== undefined

    return (
        <div className="border border-orange-100 rounded-xl overflow-hidden">
            {/* Quiz Header */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-3 border-b border-orange-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <QuestionMarkCircleIcon className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-bold text-orange-800">Quiz</span>
                    <span className="text-xs text-orange-500 bg-orange-100 px-2 py-0.5 rounded-full">{quiz.length} question{quiz.length !== 1 ? 's' : ''}</span>
                </div>
                {submitted && (
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${score === quiz.length ? 'text-green-600' : score >= quiz.length / 2 ? 'text-amber-600' : 'text-red-500'}`}>
                            {score}/{quiz.length} correct
                        </span>
                        <button onClick={handleReset} className="text-xs text-gray-500 hover:text-gray-700 underline">Retry</button>
                    </div>
                )}
            </div>

            <div className="bg-white p-4 space-y-4">
                {/* Progress dots */}
                <div className="flex items-center gap-1.5">
                    {quiz.map((qq, i) => {
                        let color = 'bg-gray-200'
                        if (submitted) {
                            color = answers[qq.id] === qq.correctAnswer ? 'bg-green-400' : 'bg-red-400'
                        } else if (answers[qq.id] !== undefined) {
                            color = 'bg-amber-400'
                        }
                        if (i === current && !submitted) color = 'bg-purple-500'
                        return (
                            <button
                                key={qq.id}
                                onClick={() => setCurrent(i)}
                                className={`h-2 rounded-full transition-all ${color} ${i === current ? 'w-6' : 'w-2'}`}
                                title={`Question ${i + 1}`}
                            />
                        )
                    })}
                    <span className="ml-auto text-xs text-gray-400">{current + 1} / {quiz.length}</span>
                </div>

                {/* Question */}
                <div>
                    {q.image && (
                        <img src={q.image} alt="Question" className="rounded-lg mb-3 max-h-40 object-cover w-full" onError={e => e.target.style.display = 'none'} />
                    )}
                    <p className="text-sm font-semibold text-gray-800 leading-snug">{q.question || <span className="text-gray-400 italic">No question text</span>}</p>
                </div>

                {/* Options */}
                <div className="space-y-2">
                    {q.options.map((opt, oIdx) => {
                        let style = 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50'
                        if (!submitted && selectedForCurrent === oIdx) {
                            style = 'border-purple-400 bg-purple-50 text-purple-800 ring-1 ring-purple-300'
                        }
                        if (submitted) {
                            if (oIdx === q.correctAnswer) {
                                style = 'border-green-400 bg-green-50 text-green-800 ring-1 ring-green-300'
                            } else if (selectedForCurrent === oIdx) {
                                style = 'border-red-400 bg-red-50 text-red-800 ring-1 ring-red-300'
                            } else {
                                style = 'border-gray-100 bg-gray-50 text-gray-400'
                            }
                        }
                        return (
                            <button
                                key={oIdx}
                                onClick={() => handleSelect(oIdx)}
                                disabled={submitted}
                                className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all flex items-center gap-3 ${style} ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
                            >
                                <span className={`w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                                    submitted && oIdx === q.correctAnswer ? 'border-green-400 bg-green-100 text-green-700' :
                                    submitted && selectedForCurrent === oIdx ? 'border-red-400 bg-red-100 text-red-600' :
                                    !submitted && selectedForCurrent === oIdx ? 'border-purple-400 bg-purple-100 text-purple-700' :
                                    'border-gray-300 text-gray-400'
                                }`}>
                                    {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span className="flex-1">{opt || <span className="italic text-gray-400">Empty option</span>}</span>
                                {submitted && oIdx === q.correctAnswer && <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />}
                                {submitted && selectedForCurrent === oIdx && oIdx !== q.correctAnswer && <XMarkIcon className="w-4 h-4 text-red-400 flex-shrink-0" />}
                            </button>
                        )
                    })}
                </div>

                {/* Explanation after wrong answer */}
                {submitted && selectedForCurrent !== q.correctAnswer && q.explanation && (
                    <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-sm text-blue-800">
                        <span className="font-semibold">Explanation: </span>{q.explanation}
                    </div>
                )}

                {/* Navigation + Submit */}
                <div className="flex items-center gap-2 pt-1">
                    <button
                        onClick={() => setCurrent(c => Math.max(0, c - 1))}
                        disabled={current === 0}
                        className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        ← Prev
                    </button>
                    <button
                        onClick={() => setCurrent(c => Math.min(quiz.length - 1, c + 1))}
                        disabled={current === quiz.length - 1}
                        className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        Next →
                    </button>
                    <div className="flex-1" />
                    {!submitted && (
                        <button
                            onClick={handleSubmit}
                            disabled={totalAnswered < quiz.length}
                            className="px-4 py-1.5 text-xs font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            Submit Quiz ({totalAnswered}/{quiz.length} answered)
                        </button>
                    )}
                    {submitted && (
                        <div className={`px-4 py-1.5 text-xs font-semibold rounded-lg ${score === quiz.length ? 'bg-green-100 text-green-700' : score >= quiz.length / 2 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600'}`}>
                            {score === quiz.length ? '🎉 Perfect score!' : score >= quiz.length / 2 ? '👍 Good attempt!' : '📚 Keep studying!'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function getYouTubeId(url) {
    if (!url) return null
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    return match ? match[1] : null
}

export default function CurriculumManagement() {
    const DEFAULT_SYLLABI = [
        {
            id: 1,
            subject: 'Mathematics',
            classLevel: '10th Standard',
            modules: [
                {
                    id: 101,
                    title: 'Quadratic Equations',
                    videoUrl: 'https://www.youtube.com/watch?v=XogXnUPkG68',
                    summary: 'Understanding the fundamentals of quadratic equations and the quadratic formula.',
                    learningObjectives: ['Solve equations by factoring', 'Apply the quadratic formula', 'Graph quadratic functions'],
                    quiz: [
                        { id: 1, question: 'What is the standard form of a quadratic equation?', options: ['ax + b = 0', 'ax² + bx + c = 0', 'a² + b² = c²', 'y = mx + c'], correctAnswer: 1 },
                        { id: 2, question: 'What is the discriminant?', options: ['b² - 4ac', '2a', '-b', '√a'], correctAnswer: 0 }
                    ]
                }
            ]
        },
        {
            id: 2,
            subject: 'Science',
            classLevel: '9th Standard',
            modules: [
                {
                    id: 201,
                    title: 'The Central Nervous System',
                    videoUrl: 'https://www.youtube.com/watch?v=qPix_X-9t7E',
                    summary: 'Exploring the brain and spinal cord, the command center of the human body.',
                    learningObjectives: ['Identify parts of the brain', 'Understand neuron transmission', 'Explain reflex actions'],
                    quiz: [
                        { id: 3, question: 'Which part of the brain controls balance?', options: ['Cerebrum', 'Cerebellum', 'Medulla', 'Hypothalamus'], correctAnswer: 1 },
                        { id: 4, question: 'What is the basic unit of the nervous system?', options: ['Cell', 'Neuron', 'Tissue', 'Organ'], correctAnswer: 1 }
                    ]
                }
            ]
        },
    ]

    const loadFromStorage = (key, fallback) => {
        try {
            const stored = localStorage.getItem(key)
            return stored ? JSON.parse(stored) : fallback
        } catch { return fallback }
    }

    const [syllabi, setSyllabi] = useState(() => loadFromStorage('curriculum_syllabi', DEFAULT_SYLLABI))

    // Playlist state
    const [savedVideos, setSavedVideos] = useState(() => loadFromStorage('curriculum_savedVideos', []))
    const [watchLater, setWatchLater] = useState(() => loadFromStorage('curriculum_watchLater', []))

    // Persist to localStorage whenever data changes
    useEffect(() => { localStorage.setItem('curriculum_syllabi', JSON.stringify(syllabi)) }, [syllabi])
    useEffect(() => { localStorage.setItem('curriculum_savedVideos', JSON.stringify(savedVideos)) }, [savedVideos])
    useEffect(() => { localStorage.setItem('curriculum_watchLater', JSON.stringify(watchLater)) }, [watchLater])

    // UI state
    const [activeClassTab, setActiveClassTab] = useState(null)
    const [expandedSubject, setExpandedSubject] = useState(null)
    const [expandedModule, setExpandedModule] = useState(null)
    const [videoModal, setVideoModal] = useState(null) // { module, syllabusId }
    const [objectivesModal, setObjectivesModal] = useState(null)
    const [playlistTab, setPlaylistTab] = useState('saved') // 'saved' | 'watchLater'
    const [showPlaylist, setShowPlaylist] = useState(false)

    // Modal state
    const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false)
    const [isModuleModalOpen, setIsModuleModalOpen] = useState(false)
    const [selectedSyllabus, setSelectedSyllabus] = useState(null)
    const [editingSyllabus, setEditingSyllabus] = useState(null)
    const [editingModule, setEditingModule] = useState(null)
    const [syllabusFormData, setSyllabusFormData] = useState({ subject: '', classLevel: '8th Standard' })
    const [moduleFormData, setModuleFormData] = useState({ title: '', videoUrl: '', summary: '', summaryImage: '', learningObjectives: '', quiz: [] })

    // Group syllabi by class level
    const classTabs = [...new Set(CLASS_LEVELS.map(l => `${l} Standard`).filter(lvl => syllabi.some(s => s.classLevel === lvl)))]
    // Also add any class levels that exist in syllabi but might not be in the pattern
    syllabi.forEach(s => { if (!classTabs.includes(s.classLevel)) classTabs.push(s.classLevel) })
    classTabs.sort((a, b) => {
        const aNum = parseInt(a)
        const bNum = parseInt(b)
        return aNum - bNum
    })

    const currentClass = activeClassTab || classTabs[0]
    const subjectsForClass = syllabi.filter(s => s.classLevel === currentClass)

    // Playlist helpers
    const isVideoSaved = (moduleId) => savedVideos.some(v => v.id === moduleId)
    const isVideoWatchLater = (moduleId) => watchLater.some(v => v.id === moduleId)

    const toggleSaved = (module) => {
        if (isVideoSaved(module.id)) {
            setSavedVideos(savedVideos.filter(v => v.id !== module.id))
        } else {
            setSavedVideos([...savedVideos, { id: module.id, title: module.title, videoUrl: module.videoUrl, addedAt: new Date() }])
        }
    }

    const toggleWatchLater = (module) => {
        if (isVideoWatchLater(module.id)) {
            setWatchLater(watchLater.filter(v => v.id !== module.id))
        } else {
            setWatchLater([...watchLater, { id: module.id, title: module.title, videoUrl: module.videoUrl, addedAt: new Date() }])
        }
    }

    // Syllabus handlers
    const handleOpenSyllabusModal = (syllabus = null) => {
        if (syllabus) {
            setEditingSyllabus(syllabus)
            setSyllabusFormData({ subject: syllabus.subject, classLevel: syllabus.classLevel })
        } else {
            setEditingSyllabus(null)
            setSyllabusFormData({ subject: '', classLevel: currentClass || '8th Standard' })
        }
        setIsSyllabusModalOpen(true)
    }

    const handleSaveSyllabus = () => {
        if (!syllabusFormData.subject.trim()) return
        if (editingSyllabus) {
            setSyllabi(syllabi.map(s => s.id === editingSyllabus.id ? { ...s, ...syllabusFormData } : s))
        } else {
            setSyllabi([...syllabi, { id: Date.now(), ...syllabusFormData, modules: [] }])
        }
        setIsSyllabusModalOpen(false)
    }

    const handleDeleteSyllabus = (id) => {
        if (window.confirm('Are you sure you want to delete this syllabus?')) {
            setSyllabi(syllabi.filter(s => s.id !== id))
        }
    }

    const handleOpenModuleModal = (syllabusId, module = null) => {
        setSelectedSyllabus(syllabusId)
        if (module) {
            setEditingModule(module)
            setModuleFormData({
                title: module.title, videoUrl: module.videoUrl, summary: module.summary,
                summaryImage: module.summaryImage || '',
                learningObjectives: module.learningObjectives.join('\n'), quiz: module.quiz || []
            })
        } else {
            setEditingModule(null)
            setModuleFormData({ title: '', videoUrl: '', summary: '', summaryImage: '', learningObjectives: '', quiz: [] })
        }
        setIsModuleModalOpen(true)
    }

    const handleSaveModule = () => {
        if (!moduleFormData.title.trim()) return
        const preparedModule = {
            id: editingModule ? editingModule.id : Date.now(),
            title: moduleFormData.title, videoUrl: moduleFormData.videoUrl,
            summary: moduleFormData.summary, summaryImage: moduleFormData.summaryImage,
            learningObjectives: moduleFormData.learningObjectives.split('\n').filter(l => l.trim()),
            quiz: moduleFormData.quiz
        }
        setSyllabi(syllabi.map(s => {
            if (s.id === selectedSyllabus) {
                if (editingModule) return { ...s, modules: s.modules.map(m => m.id === editingModule.id ? preparedModule : m) }
                return { ...s, modules: [...s.modules, preparedModule] }
            }
            return s
        }))
        setIsModuleModalOpen(false)
    }

    const handleDeleteModule = (syllabusId, moduleId) => {
        if (window.confirm('Are you sure you want to delete this module?')) {
            setSyllabi(syllabi.map(s => s.id === syllabusId ? { ...s, modules: s.modules.filter(m => m.id !== moduleId) } : s))
        }
    }

    const totalPlaylists = savedVideos.length + watchLater.length

    return (
        <div className="space-y-6 font-sans">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Education Curriculum</h3>
                    <p className="text-sm text-gray-500 mt-0.5">Manage syllabi and structured learning content</p>
                </div>
                <div className="flex items-center gap-2">
                    {/* Playlist button */}
                    <button
                        onClick={() => setShowPlaylist(!showPlaylist)}
                        className="relative flex items-center px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <BookmarkIcon className="w-4 h-4 mr-1.5 text-indigo-500" />
                        My Playlist
                        {totalPlaylists > 0 && (
                            <span className="ml-1.5 bg-indigo-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center">{totalPlaylists}</span>
                        )}
                    </button>
                    <button
                        onClick={() => handleOpenSyllabusModal()}
                        className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg shadow-sm text-sm font-medium hover:bg-purple-700 transition-colors"
                    >
                        <PlusIcon className="w-4 h-4 mr-1.5" />
                        Add Syllabus
                    </button>
                </div>
            </div>

            {/* Playlist Panel */}
            {showPlaylist && (
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                        <h4 className="font-semibold text-gray-800">My Video Playlist</h4>
                        <button onClick={() => setShowPlaylist(false)} className="text-gray-400 hover:text-gray-600">
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex border-b border-gray-100">
                        <button
                            onClick={() => setPlaylistTab('saved')}
                            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${playlistTab === 'saved' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <BookmarkSolidIcon className="w-4 h-4 inline mr-1" />Saved ({savedVideos.length})
                        </button>
                        <button
                            onClick={() => setPlaylistTab('watchLater')}
                            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${playlistTab === 'watchLater' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <ClockIcon className="w-4 h-4 inline mr-1" />Watch Later ({watchLater.length})
                        </button>
                    </div>
                    <div className="p-4">
                        {(playlistTab === 'saved' ? savedVideos : watchLater).length === 0 ? (
                            <p className="text-center text-sm text-gray-400 py-6">No videos here yet. Browse modules and add videos!</p>
                        ) : (
                            <div className="space-y-2">
                                {(playlistTab === 'saved' ? savedVideos : watchLater).map(v => (
                                    <div key={v.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors">
                                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <PlayIcon className="w-5 h-5 text-red-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-800 truncate">{v.title}</p>
                                            <p className="text-xs text-gray-400">Added {v.addedAt.toLocaleDateString()}</p>
                                        </div>
                                        <button
                                            onClick={() => setVideoModal({ module: { ...v, learningObjectives: [] } })}
                                            className="text-xs text-purple-600 hover:text-purple-800 font-medium px-2 py-1 rounded hover:bg-purple-100"
                                        >
                                            Play
                                        </button>
                                        <button
                                            onClick={() => playlistTab === 'saved' ? setSavedVideos(savedVideos.filter(x => x.id !== v.id)) : setWatchLater(watchLater.filter(x => x.id !== v.id))}
                                            className="text-gray-300 hover:text-red-500 transition-colors"
                                        >
                                            <XMarkIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Class Level Tabs */}
            {classTabs.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    {/* Tab Bar */}
                    <div className="flex overflow-x-auto border-b border-gray-100 bg-gray-50/60">
                        {classTabs.map(cls => (
                            <button
                                key={cls}
                                onClick={() => { setActiveClassTab(cls); setExpandedSubject(null); setExpandedModule(null) }}
                                className={`flex-shrink-0 px-5 py-3 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                                    currentClass === cls
                                        ? 'border-purple-600 text-purple-700 bg-white'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/70'
                                }`}
                            >
                                {cls}
                            </button>
                        ))}
                    </div>

                    {/* Subjects inside selected class */}
                    <div className="p-5">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                                Subjects — {currentClass}
                            </h4>
                            <button
                                onClick={() => handleOpenSyllabusModal()}
                                className="text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center"
                            >
                                <PlusIcon className="w-4 h-4 mr-1" />Add Subject
                            </button>
                        </div>

                        {subjectsForClass.length === 0 ? (
                            <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl">
                                <AcademicCapIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                <p className="text-sm text-gray-400">No subjects for this class yet.</p>
                                <button onClick={() => handleOpenSyllabusModal()} className="mt-2 text-sm text-purple-600 font-medium hover:underline">Add a subject</button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {subjectsForClass.map(syllabus => (
                                    <div key={syllabus.id} className="border border-gray-200 rounded-xl overflow-hidden">
                                        {/* Subject Header */}
                                        <div
                                            className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${expandedSubject === syllabus.id ? 'bg-purple-50' : 'bg-white hover:bg-gray-50'}`}
                                            onClick={() => setExpandedSubject(expandedSubject === syllabus.id ? null : syllabus.id)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center">
                                                    <AcademicCapIcon className="w-5 h-5 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm">{syllabus.subject}</p>
                                                    <p className="text-xs text-gray-400">{syllabus.modules.length} module{syllabus.modules.length !== 1 ? 's' : ''}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <button onClick={e => { e.stopPropagation(); handleOpenSyllabusModal(syllabus) }} className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                                                    <PencilIcon className="w-4 h-4" />
                                                </button>
                                                <button onClick={e => { e.stopPropagation(); handleDeleteSyllabus(syllabus.id) }} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                                {expandedSubject === syllabus.id
                                                    ? <ChevronDownIcon className="w-4 h-4 text-gray-400 ml-1" />
                                                    : <ChevronRightIcon className="w-4 h-4 text-gray-400 ml-1" />}
                                            </div>
                                        </div>

                                        {/* Modules */}
                                        {expandedSubject === syllabus.id && (
                                            <div className="border-t border-gray-100 bg-white px-4 pb-4 pt-3">
                                                <div className="flex justify-between items-center mb-3">
                                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Learning Modules</p>
                                                    <button
                                                        onClick={() => handleOpenModuleModal(syllabus.id)}
                                                        className="text-xs font-medium text-purple-600 hover:text-purple-800 flex items-center"
                                                    >
                                                        <PlusIcon className="w-3.5 h-3.5 mr-0.5" />New Module
                                                    </button>
                                                </div>

                                                {syllabus.modules.length === 0 ? (
                                                    <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded-lg">
                                                        <p className="text-xs text-gray-400">No modules yet. Add one above.</p>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-2">
                                                        {syllabus.modules.map((module, idx) => (
                                                            <div key={module.id} className="border border-gray-100 rounded-lg overflow-hidden">
                                                                {/* Module Row */}
                                                                <div
                                                                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${expandedModule === module.id ? 'bg-indigo-50/60' : 'bg-gray-50/50 hover:bg-gray-100/50'}`}
                                                                    onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                                                                >
                                                                    <div className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-400 flex-shrink-0">
                                                                        {idx + 1}
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-sm font-semibold text-gray-800">{module.title}</p>
                                                                        <div className="flex items-center gap-3 mt-0.5">
                                                                            {module.videoUrl && (
                                                                                <span className="text-xs text-blue-500 flex items-center gap-0.5">
                                                                                    <VideoCameraIcon className="w-3 h-3" />Video
                                                                                </span>
                                                                            )}
                                                                            <span className="text-xs text-green-600 flex items-center gap-0.5">
                                                                                <ListBulletIcon className="w-3 h-3" />{module.learningObjectives.length} Objectives
                                                                            </span>
                                                                            {module.quiz?.length > 0 && (
                                                                                <span className="text-xs text-orange-500 flex items-center gap-0.5">
                                                                                    <QuestionMarkCircleIcon className="w-3 h-3" />{module.quiz.length} Questions
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                                                                        <button onClick={() => handleOpenModuleModal(syllabus.id, module)} className="p-1.5 text-gray-400 hover:text-indigo-600 transition-colors rounded">
                                                                            <PencilIcon className="w-3.5 h-3.5" />
                                                                        </button>
                                                                        <button onClick={() => handleDeleteModule(syllabus.id, module.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded">
                                                                            <TrashIcon className="w-3.5 h-3.5" />
                                                                        </button>
                                                                        {expandedModule === module.id
                                                                            ? <ChevronDownIcon className="w-4 h-4 text-gray-300" />
                                                                            : <ChevronRightIcon className="w-4 h-4 text-gray-300" />}
                                                                    </div>
                                                                </div>

                                                                {/* Module Expanded Detail */}
                                                                {expandedModule === module.id && (
                                                                    <div className="border-t border-gray-100 bg-white p-4 space-y-4">

                                                                        {/* Video Section */}
                                                                        {module.videoUrl && (
                                                                            <div>
                                                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Video Lesson</p>
                                                                                {getYouTubeId(module.videoUrl) ? (
                                                                                    <div>
                                                                                        <div className="relative rounded-lg overflow-hidden bg-black aspect-video w-full max-w-xl">
                                                                                            <iframe
                                                                                                src={`https://www.youtube.com/embed/${getYouTubeId(module.videoUrl)}`}
                                                                                                title={module.title}
                                                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                                                allowFullScreen
                                                                                                className="w-full h-full"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="flex items-center gap-2 mt-2">
                                                                                            <button
                                                                                                onClick={() => toggleSaved(module)}
                                                                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${isVideoSaved(module.id) ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-200 hover:text-indigo-600'}`}
                                                                                            >
                                                                                                {isVideoSaved(module.id) ? <BookmarkSolidIcon className="w-3.5 h-3.5 text-indigo-600" /> : <BookmarkIcon className="w-3.5 h-3.5" />}
                                                                                                {isVideoSaved(module.id) ? 'Saved' : 'Save'}
                                                                                            </button>
                                                                                            <button
                                                                                                onClick={() => toggleWatchLater(module)}
                                                                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${isVideoWatchLater(module.id) ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-white border-gray-200 text-gray-600 hover:border-amber-200 hover:text-amber-600'}`}
                                                                                            >
                                                                                                <ClockIcon className="w-3.5 h-3.5" />
                                                                                                {isVideoWatchLater(module.id) ? '✓ Watch Later' : 'Watch Later'}
                                                                                            </button>
                                                                                            <a
                                                                                                href={module.videoUrl}
                                                                                                target="_blank"
                                                                                                rel="noopener noreferrer"
                                                                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 bg-white text-gray-600 hover:border-red-200 hover:text-red-600 transition-all"
                                                                                            >
                                                                                                <PlayIcon className="w-3.5 h-3.5" />
                                                                                                Open in YouTube
                                                                                            </a>
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="flex items-center gap-2">
                                                                                        <a
                                                                                            href={module.videoUrl}
                                                                                            target="_blank"
                                                                                            rel="noopener noreferrer"
                                                                                            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                                                                                        >
                                                                                            <PlayIcon className="w-4 h-4" />Open Video
                                                                                        </a>
                                                                                        <button onClick={() => toggleSaved(module)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${isVideoSaved(module.id) ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-200 text-gray-600'}`}>
                                                                                            <BookmarkIcon className="w-3.5 h-3.5" />{isVideoSaved(module.id) ? 'Saved' : 'Save'}
                                                                                        </button>
                                                                                        <button onClick={() => toggleWatchLater(module)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${isVideoWatchLater(module.id) ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-white border-gray-200 text-gray-600'}`}>
                                                                                            <ClockIcon className="w-3.5 h-3.5" />Watch Later
                                                                                        </button>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        )}

                                                                        {/* Summary */}
                                                                        {module.summary && (
                                                                            <div>
                                                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Summary</p>
                                                                                <p className="text-sm text-gray-600 leading-relaxed">{module.summary}</p>
                                                                                {module.summaryImage && (
                                                                                    <img src={module.summaryImage} alt="Summary" className="mt-2 rounded-lg max-h-48 object-cover" onError={e => e.target.style.display = 'none'} />
                                                                                )}
                                                                            </div>
                                                                        )}

                                                                        {/* Learning Objectives */}
                                                                        {module.learningObjectives.length > 0 && (
                                                                            <div>
                                                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Learning Objectives</p>
                                                                                <ul className="space-y-1.5">
                                                                                    {module.learningObjectives.map((obj, i) => (
                                                                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                                                                            <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                                                                            {obj}
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        )}

                                                                        {/* Interactive Quiz */}
                                                                        {module.quiz?.length > 0 && (
                                                                            <div>
                                                                                <div className="flex items-center justify-between mb-2">
                                                                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quiz</p>
                                                                                    <button onClick={() => handleOpenModuleModal(syllabus.id, module)} className="text-xs text-purple-600 hover:underline font-medium">Edit questions</button>
                                                                                </div>
                                                                                <QuizPlayer quiz={module.quiz} moduleId={module.id} />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {classTabs.length === 0 && (
                <div className="text-center py-16 bg-white border border-dashed border-gray-200 rounded-xl">
                    <AcademicCapIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No curriculum yet</p>
                    <p className="text-sm text-gray-400 mt-1">Click "Add Syllabus" to get started</p>
                </div>
            )}

            {/* Syllabus Modal */}
            {isSyllabusModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setIsSyllabusModalOpen(false)} />
                        <div className="relative bg-white rounded-xl px-6 py-6 shadow-xl sm:max-w-lg w-full z-10">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">{editingSyllabus ? 'Edit Syllabus' : 'Add New Syllabus'}</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label>
                                    <input type="text" value={syllabusFormData.subject} onChange={e => setSyllabusFormData({ ...syllabusFormData, subject: e.target.value })} placeholder="e.g. Emotional Intelligence" className="block w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-purple-500 focus:border-purple-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Class Level</label>
                                    <select value={syllabusFormData.classLevel} onChange={e => setSyllabusFormData({ ...syllabusFormData, classLevel: e.target.value })} className="block w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-purple-500 focus:border-purple-500">
                                        {CLASS_LEVELS.map(lvl => <option key={lvl} value={`${lvl} Standard`}>{lvl} Standard</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="mt-6 flex gap-3">
                                <button onClick={handleSaveSyllabus} className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition text-sm font-medium">Save</button>
                                <button onClick={() => setIsSyllabusModalOpen(false)} className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-medium">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Module Modal */}
            {isModuleModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setIsModuleModalOpen(false)} />
                        <div className="relative bg-white rounded-xl px-6 py-6 shadow-xl sm:max-w-2xl w-full z-10">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">{editingModule ? 'Edit Content Module' : 'Add Content Module'}</h3>
                            <div className="max-h-[70vh] overflow-y-auto pr-1 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Module Title</label>
                                    <input type="text" value={moduleFormData.title} onChange={e => setModuleFormData({ ...moduleFormData, title: e.target.value })} placeholder="e.g. Recognizing Social Cues" className="block w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-purple-500 focus:border-purple-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center"><VideoCameraIcon className="w-4 h-4 mr-1 text-gray-400" />Video URL</label>
                                    <input type="text" value={moduleFormData.videoUrl} onChange={e => setModuleFormData({ ...moduleFormData, videoUrl: e.target.value })} placeholder="https://youtube.com/..." className="block w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-purple-500 focus:border-purple-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center"><ListBulletIcon className="w-4 h-4 mr-1 text-gray-400" />Learning Objectives (one per line)</label>
                                    <textarea value={moduleFormData.learningObjectives} onChange={e => setModuleFormData({ ...moduleFormData, learningObjectives: e.target.value })} rows="3" placeholder="Recognize facial expressions&#10;Understand body language" className="block w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-purple-500 focus:border-purple-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center"><DocumentTextIcon className="w-4 h-4 mr-1 text-gray-400" />Content Summary</label>
                                    <textarea value={moduleFormData.summary} onChange={e => setModuleFormData({ ...moduleFormData, summary: e.target.value })} rows="2" className="block w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-purple-500 focus:border-purple-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center"><PhotoIcon className="w-4 h-4 mr-1 text-gray-400" />Summary Image URL (Optional)</label>
                                    <input type="text" value={moduleFormData.summaryImage} onChange={e => setModuleFormData({ ...moduleFormData, summaryImage: e.target.value })} placeholder="https://example.com/image.jpg" className="block w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-purple-500 focus:border-purple-500" />
                                </div>
                                {/* Quiz Builder */}
                                <div className="border border-purple-100 rounded-xl overflow-hidden">
                                    <div className="bg-purple-50 px-4 py-2.5 border-b border-purple-100 flex items-center justify-between">
                                        <h4 className="text-sm font-semibold text-purple-900 flex items-center"><QuestionMarkCircleIcon className="w-4 h-4 mr-1" />Quiz Questions</h4>
                                        <button onClick={() => { const newQ = { id: Date.now(), question: '', image: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' }; setModuleFormData({ ...moduleFormData, quiz: [...moduleFormData.quiz, newQ] }) }} className="text-xs font-medium text-purple-600 hover:text-purple-800">+ Add Question</button>
                                    </div>
                                    <div className="p-4 space-y-4 bg-white">
                                        {moduleFormData.quiz.length === 0 ? (
                                            <p className="text-xs text-gray-400 text-center py-2">No quiz questions yet. Click "+ Add Question" to start.</p>
                                        ) : (
                                            moduleFormData.quiz.map((q, qIdx) => (
                                                <div key={q.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50 space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Question {qIdx + 1}</span>
                                                        <button onClick={() => setModuleFormData({ ...moduleFormData, quiz: moduleFormData.quiz.filter((_, i) => i !== qIdx) })} className="text-red-400 hover:text-red-600"><TrashIcon className="w-4 h-4" /></button>
                                                    </div>
                                                    <input type="text" value={q.question} onChange={e => { const nq = [...moduleFormData.quiz]; nq[qIdx].question = e.target.value; setModuleFormData({ ...moduleFormData, quiz: nq }) }} placeholder="Enter question text..." className="block w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:ring-purple-500" />
                                                    <input type="text" value={q.image || ''} onChange={e => { const nq = [...moduleFormData.quiz]; nq[qIdx].image = e.target.value; setModuleFormData({ ...moduleFormData, quiz: nq }) }} placeholder="Question Image URL (Optional)" className="block w-full border border-gray-200 rounded-lg py-1.5 px-3 text-xs focus:ring-purple-500 text-gray-600" />
                                                    <div className="space-y-2">
                                                        <p className="text-xs font-medium text-gray-500">Options (select correct answer)</p>
                                                        {q.options.map((opt, oIdx) => (
                                                            <div key={oIdx} className={`flex items-start gap-2 p-2.5 rounded-lg border ${q.correctAnswer === oIdx ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
                                                                <input type="radio" name={`correct-${q.id}`} checked={q.correctAnswer === oIdx} onChange={() => { const nq = [...moduleFormData.quiz]; nq[qIdx].correctAnswer = oIdx; setModuleFormData({ ...moduleFormData, quiz: nq }) }} className="mt-1.5 h-4 w-4 text-green-600" />
                                                                <textarea value={opt} onChange={e => { const nq = [...moduleFormData.quiz]; nq[qIdx].options[oIdx] = e.target.value; setModuleFormData({ ...moduleFormData, quiz: nq }) }} rows="2" placeholder={`Option ${oIdx + 1}`} className="flex-1 border-gray-200 rounded-md text-sm focus:ring-purple-500 resize-y min-h-[50px]" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 mb-1">Explanation (shown after wrong answer)</label>
                                                        <textarea value={q.explanation || ''} onChange={e => { const nq = [...moduleFormData.quiz]; nq[qIdx].explanation = e.target.value; setModuleFormData({ ...moduleFormData, quiz: nq }) }} rows="2" placeholder="Explain why the correct answer is right..." className="block w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:ring-purple-500" />
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex gap-3">
                                <button onClick={handleSaveModule} className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition text-sm font-medium">Save Module</button>
                                <button onClick={() => setIsModuleModalOpen(false)} className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-medium">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
