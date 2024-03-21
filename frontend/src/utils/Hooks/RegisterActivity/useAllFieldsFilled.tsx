import { RegisterActivity } from '@/types/Activities';
import { useState, useEffect } from 'react';

export const useFormField = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);
  return [value, setValue] as const;
};

export const useAllFieldsFilled = (
  isStartFilled: boolean,
  isEndFilled: boolean,
  isTitleFilled: boolean,
  isDetailsFilled: boolean,
  showLocation: boolean,
  showPresenter: boolean,
  isPresenterFilled: boolean,
  showExternalPresenter: boolean,
  isExternalPresenterFilled: boolean,
  editActivity: RegisterActivity,
) => {
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);

  useEffect(() => {
    setIsAllFieldsFilled(
      (isStartFilled && isEndFilled && isTitleFilled && isDetailsFilled && showLocation) ||
        (isStartFilled &&
          isEndFilled &&
          isTitleFilled &&
          isDetailsFilled &&
          ((showPresenter && isPresenterFilled) ||
            (showExternalPresenter && isExternalPresenterFilled)) &&
          (editActivity.presenter.length > 0 || editActivity.externalPresenter.length > 0)),
    );
  }, [
    isStartFilled,
    isEndFilled,
    isTitleFilled,
    isDetailsFilled,
    showLocation,
    showPresenter,
    isPresenterFilled,
    showExternalPresenter,
    isExternalPresenterFilled,
    editActivity.presenter.length,
    editActivity.externalPresenter.length,
  ]);

  return isAllFieldsFilled;
};
