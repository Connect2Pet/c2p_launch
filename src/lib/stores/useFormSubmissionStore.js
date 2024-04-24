import create from "zustand";
import { persist } from "zustand/middleware";

const useSubmissionStore = create(
  persist(
    (set, get) => ({
      submissions: {}, // stores email and submission status

      addSubmission: (email) => {
        const submissions = get().submissions;
        if (!submissions[email]) {
          set({
            submissions: {
              ...submissions,
              [email]: true, // mark as submitted
            },
          });
        }
      },

      hasSubmitted: (email) => {
        const submissions = get().submissions;
        return !!submissions[email]; // returns true if already submitted, false otherwise
      },
    }),
    {
      name: "submission-storage", // unique name for local storage
      getStorage: () => localStorage, // define localStorage as the storage location
    }
  )
);

export default useSubmissionStore;
