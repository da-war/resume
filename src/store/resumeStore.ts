import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the store state type
interface ResumeStore {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    photo: string;
    about: string;
  };
  summaries: {
    id: string;
    title: string;
    summary: string;
  }[];
  education: {
    id: string;
    degree: string;
    college: string;
    dateFrom: string;
    dateTo: string;
  }[];
  experiences: {
    id: string;
    company: string;
    position: string;
    date: string;
    description: string;
  }[];
  skills: string[];
  computerSkills: string[];
  languages: {
    name: string;
    level: string;
  }[];
  courses: {
    id: string;
    title: string;
    dateFrom: string;
    dateTo: string;
    courseFrom: string;
  }[];
  hobbies: string[];
  achievements: string[];

  // Personal Info operations
  updatePersonalInfo: (info: ResumeStore['personalInfo']) => void;

  // Summary operations
  addSummary: (summary: Omit<ResumeStore['summaries'][0], 'id'>) => void;
  updateSummary: (id: string, summary: Partial<Omit<ResumeStore['summaries'][0], 'id'>>) => void;
  removeSummary: (id: string) => void;

  // Education operations
  addEducation: (education: Omit<ResumeStore['education'][0], 'id'>) => void;
  updateEducation: (id: string, education: Partial<Omit<ResumeStore['education'][0], 'id'>>) => void;
  removeEducation: (id: string) => void;

  // Experience operations
  addExperience: (experience: Omit<ResumeStore['experiences'][0], 'id'>) => void;
  updateExperience: (id: string, experience: Partial<Omit<ResumeStore['experiences'][0], 'id'>>) => void;
  removeExperience: (id: string) => void;

  // Skills operations
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;

  // Computer Skills operations
  addComputerSkill: (skill: string) => void;
  removeComputerSkill: (skill: string) => void;

  // Language operations
  addLanguage: (language: ResumeStore['languages'][0]) => void;
  removeLanguage: (name: string) => void;

  // Course operations
  addCourse: (course: Omit<ResumeStore['courses'][0], 'id'>) => void;
  updateCourse: (id: string, course: Partial<Omit<ResumeStore['courses'][0], 'id'>>) => void;
  removeCourse: (id: string) => void;

  // Hobby operations
  addHobby: (hobby: string) => void;
  removeHobby: (hobby: string) => void;

  // Achievement operations
  addAchievement: (achievement: string) => void;
  removeAchievement: (achievement: string) => void;

  // Reset operation
  resetStore: () => void;
}

// Create the Zustand store with persistence
export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      // Initial state
      personalInfo: { name: '', email: '', phone: '', photo: '', about: '' },
      summaries: [],
      education: [],
      experiences: [],
      skills: [],
      computerSkills: [],
      languages: [],
      courses: [],
      hobbies: [],
      achievements: [],

      // Personal Info operations
      updatePersonalInfo: (info) => set({ personalInfo: info }),

      // Summary operations
      addSummary: (summary) =>
        set((state) => ({
          summaries: [...state.summaries, { id: Date.now().toString(), ...summary }],
        })),
      updateSummary: (id, updatedSummary) =>
        set((state) => ({
          summaries: state.summaries.map((s) =>
            s.id === id ? { ...s, ...updatedSummary } : s
          ),
        })),
      removeSummary: (id) =>
        set((state) => ({
          summaries: state.summaries.filter((s) => s.id !== id),
        })),

      // Education operations
      addEducation: (education) =>
        set((state) => ({
          education: [...state.education, { id: Date.now().toString(), ...education }],
        })),
      updateEducation: (id, updatedEducation) =>
        set((state) => ({
          education: state.education.map((edu) =>
            edu.id === id ? { ...edu, ...updatedEducation } : edu
          ),
        })),
      removeEducation: (id) =>
        set((state) => ({
          education: state.education.filter((edu) => edu.id !== id),
        })),

      // Experience operations
      addExperience: (experience) =>
        set((state) => ({
          experiences: [...state.experiences, { id: Date.now().toString(), ...experience }],
        })),
      updateExperience: (id, updatedExperience) =>
        set((state) => ({
          experiences: state.experiences.map((exp) =>
            exp.id === id ? { ...exp, ...updatedExperience } : exp
          ),
        })),
      removeExperience: (id) =>
        set((state) => ({
          experiences: state.experiences.filter((exp) => exp.id !== id),
        })),

      // Skills operations
      addSkill: (skill) => set((state) => ({ skills: [...state.skills, skill] })),
      removeSkill: (skill) => set((state) => ({ skills: state.skills.filter((s) => s !== skill) })),

      // Computer Skills operations
      addComputerSkill: (skill) => set((state) => ({ computerSkills: [...state.computerSkills, skill] })),
      removeComputerSkill: (skill) => set((state) => ({ computerSkills: state.computerSkills.filter((s) => s !== skill) })),

      // Language operations
      addLanguage: (language) => set((state) => ({ languages: [...state.languages, language] })),
      removeLanguage: (name) => set((state) => ({ languages: state.languages.filter((lang) => lang.name !== name) })),

      // Course operations
      addCourse: (course) =>
        set((state) => ({
          courses: [...state.courses, { id: Date.now().toString(), ...course }],
        })),
      updateCourse: (id, updatedCourse) =>
        set((state) => ({
          courses: state.courses.map((course) =>
            course.id === id ? { ...course, ...updatedCourse } : course
          ),
        })),
      removeCourse: (id) =>
        set((state) => ({
          courses: state.courses.filter((course) => course.id !== id),
        })),

      // Hobby operations
      addHobby: (hobby) => set((state) => ({ hobbies: [...state.hobbies, hobby] })),
      removeHobby: (hobby) => set((state) => ({ hobbies: state.hobbies.filter((h) => h !== hobby) })),

      // Achievement operations
      addAchievement: (achievement) => set((state) => ({ achievements: [...state.achievements, achievement] })),
      removeAchievement: (achievement) => set((state) => ({ achievements: state.achievements.filter((a) => a !== achievement) })),

      // Reset operation
      resetStore: () => set({
        personalInfo: { name: '', email: '', phone: '', photo: '', about: '' },
        summaries: [],
        education: [],
        experiences: [],
        skills: [],
        computerSkills: [],
        languages: [],
        courses: [],
        hobbies: [],
        achievements: [],
      }),
    }),
    {
      name: 'resume-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
