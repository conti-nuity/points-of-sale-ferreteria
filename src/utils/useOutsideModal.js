import { useEffect } from "react";

export const useOutsideModal = (ref, setShowModalPreferences) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowModalPreferences(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]); // eslint-disable-line react-hooks/exhaustive-deps
  // also, trigger is unnecessary dependency by default so you need comment line in the top
};
