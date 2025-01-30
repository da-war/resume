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
  experiences: { company: string; position: string; date: string; description: string; }[];
  skills: string[];
  languages: { name: string; level: string; }[];
  hobbies: string[];
  achievements: string[];
  updatePersonalInfo: (info: ResumeStore['personalInfo']) => void;
  addExperience: (experience: ResumeStore['experiences'][0]) => void;
  updateExperience: (index: number, experience: ResumeStore['experiences'][0]) => void;
  removeExperience: (index: number) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  addLanguage: (language: ResumeStore['languages'][0]) => void;
  removeLanguage: (name: string) => void;
  addHobby: (hobby: string) => void;
  removeHobby: (hobby: string) => void;
  addAchievement: (achievement: string) => void;
  removeAchievement: (achievement: string) => void;
  resetStore: () => void;
}

// Create the Zustand store with persistence
export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      personalInfo: { name: '', email: '', phone: '', photo: '', about: '' },
      experiences: [],
      skills: [],
      languages: [],
      hobbies: [],
      achievements: [],

      updatePersonalInfo: (info) => set({ personalInfo: info }),
      addExperience: (experience) =>
        set((state) => ({
          experiences: [...state.experiences, { id: Date.now().toString(), ...experience }],
        })),

      removeExperience: (id) =>
        set((state) => ({
          experiences: state.experiences.filter((exp) => exp.id !== id),
        })),

      updateExperience: (id, updatedExperience) =>
        set((state) => ({
          experiences: state.experiences.map((exp) =>
            exp.id === id ? { ...exp, ...updatedExperience } : exp
          ),
        })),
      addSkill: (skill) => set((state) => ({ skills: [...state.skills, skill] })),
      removeSkill: (skill) => set((state) => ({ skills: state.skills.filter((s) => s !== skill) })),
      addLanguage: (language) => set((state) => ({ languages: [...state.languages, language] })),
      removeLanguage: (name) => set((state) => ({ languages: state.languages.filter((lang) => lang.name !== name) })),
      addHobby: (hobby) => set((state) => ({ hobbies: [...state.hobbies, hobby] })),
      removeHobby: (hobby) => set((state) => ({ hobbies: state.hobbies.filter((h) => h !== hobby) })),
      addAchievement: (achievement) => set((state) => ({ achievements: [...state.achievements, achievement] })),
      removeAchievement: (achievement) => set((state) => ({ achievements: state.achievements.filter((a) => a !== achievement) })),
      resetStore: () => set(() => ({
        personalInfo: { name: '', email: '', phone: '', photo: '', about: '' },
        experiences: [],
        skills: [],
        languages: [],
        hobbies: [],
        achievements: [],
      })),
    }),
    {
      name: 'resume-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);


