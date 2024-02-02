/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = (cb: any, wait: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb.apply(context, args);
    }, wait);
  };
};

export const formatDate = (
  param: number | string,
  isVersionHistory: boolean | null
) => {
  const date = new Date(param);
  const options: Intl.DateTimeFormatOptions = isVersionHistory
    ? {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, // Set to true for 12-hour format with AM/PM
      }
    : {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };
  return date.toLocaleString('en-US', options).replace('at', '');
};

// Utility function to check if arrays have the same elements
export const isChanging = (previousData: any, newData: any) => {
  // Check if the length of the arrays is different
  if (previousData.length !== newData.length) {
    return false;
  }

  // Iterate over each object in the array
  for (let i = 0; i < newData.length; i++) {
    const previousItem = previousData[i];
    const newItem = newData[i];
    // Check if the objects have the same number of properties
    if (Object.keys(previousItem).length !== Object.keys(newItem).length) {
      return false;
    }

    // Check if any property is added or modified
    for (const key in newItem) {
      if (
        !previousItem.hasOwnProperty(key) ||
        previousItem[key] !== newItem[key]
      ) {
        // If the property is "valueList" and its value is an array, recursively check for changes
        if (
          key === 'valueList' &&
          Array.isArray(previousItem[key]) &&
          Array.isArray(newItem[key])
        ) {
          if (!isChanging(previousItem[key], newItem[key])) {
            return false;
          }
        } else if (
          key === 'dashArray' &&
          Array.isArray(previousItem[key]) &&
          Array.isArray(newItem[key])
        ) {
          return true;
        } else if (newItem[key] === 'width' || newItem[key] === 'height') {
          // If the property is "width" or "height," check for changes
          return false;
        } else {
          return false;
        }
      }
    }
  }

  // No changes detected
  return true;
};
