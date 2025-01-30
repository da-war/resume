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
  updateSkills: (skills: string[]) => void;
  updateLanguages: (languages: ResumeStore['languages']) => void;
  updateHobbies: (hobbies: string[]) => void;
  updateAchievements: (achievements: string[]) => void;
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
      addExperience: (experience) => set((state) => ({ experiences: [...state.experiences, experience] })),
      updateExperience: (index, experience) => set((state) => ({
        experiences: state.experiences.map((exp, i) => (i === index ? experience : exp)),
      })),
      removeExperience: (index) => set((state) => ({
        experiences: state.experiences.filter((_, i) => i !== index),
      })),
      updateSkills: (skills) => set({ skills }),
      updateLanguages: (languages) => set({ languages }),
      updateHobbies: (hobbies) => set({ hobbies }),
      updateAchievements: (achievements) => set({ achievements }),
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