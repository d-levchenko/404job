'use client';

import { useState } from 'react';

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import toast from 'react-hot-toast';

import KeyboardArrowDown from '@/assets/keyboardArrowDown.svg';
import KeyboardArrowUp from '@/assets/keyboard-arrow-up.svg';

import Loader from '@/components/Loader/Loader';

import {
  type ApplicationStatus,
  type EditableApplicationStatus,
  getEmployerApplications,
  updateApplicationStatus,
} from '@/lib/candidatesApi';

import css from './CandidatesList.module.css';

const APPLICATIONS_PER_PAGE = 7;

const statusLabels: Record<ApplicationStatus, string> = {
  pending: 'На розгляді',
  reviewed: 'На розгляді',
  accepted: 'Запрошено на інтервʼю',
  rejected: 'Відхилено',
};

const statusOptions: {
  value: EditableApplicationStatus;
  label: string;
}[] = [
  {
    value: 'reviewed',
    label: 'На розгляді',
  },
  {
    value: 'accepted',
    label: 'Запрошено на інтервʼю',
  },
  {
    value: 'rejected',
    label: 'Відхилено',
  },
];

const CandidatesList = () => {
  const queryClient = useQueryClient();

  const [openStatusId, setOpenStatusId] = useState<string | null>(null);

  const {
    data,
    isLoading,
    isError,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['employerApplications'],

    queryFn: ({ pageParam }) =>
      getEmployerApplications({
        page: pageParam,
        perPage: APPLICATIONS_PER_PAGE,
      }),

    initialPageParam: 1,

    getNextPageParam: lastPage =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const statusMutation = useMutation({
    mutationFn: ({
      applicationId,
      status,
    }: {
      applicationId: string;
      status: EditableApplicationStatus;
    }) => updateApplicationStatus(applicationId, status),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['employerApplications'],
      });

      toast.success('Статус кандидата оновлено');
    },

    onError: () => {
      toast.error('Не вдалося оновити статус кандидата.');
    },
  });

  const applications = data?.pages.flatMap(page => page.applications) ?? [];

  const handleStatusChange = (
    applicationId: string,
    status: EditableApplicationStatus,
  ) => {
    setOpenStatusId(null);

    statusMutation.mutate({
      applicationId,
      status,
    });
  };

  const handleRefresh = async () => {
    const result = await refetch();

    if (result.isSuccess) {
      toast.success('Список кандидатів оновлено');
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Не вдалося завантажити список кандидатів.</p>;
  }

  const hasCandidates = applications.length > 0;

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <h2 className={css.title}>Кандидати</h2>

        <button
          type="button"
          className={css.refreshButton}
          onClick={handleRefresh}
          disabled={isFetching}>
          {isFetching ? 'Оновлення...' : 'Оновити список кандидатів'}
        </button>
      </div>

      {hasCandidates ? (
        <>
          <div className={css.scroll}>
            <div className={css.list}>
              {applications.map(application => {
                const isStatusUpdating =
                  statusMutation.isPending &&
                  statusMutation.variables?.applicationId ===
                    application.applicationId;

                return (
                  <div
                    key={application.applicationId}
                    className={css.candidate}>
                    <p className={css.name}>{application.candidateName}</p>

                    <p className={css.vacancy}>{application.vacancyTitle}</p>

                    <div className={css.candidateActions}>
                      {application.resumeUrl ? (
                        <a
                          href={application.resumeUrl}
                          className={css.resume}
                          target="_blank"
                          rel="noreferrer">
                          {application.resumeName || 'Резюме'}
                        </a>
                      ) : (
                        <span className={css.resume}>Резюме відсутнє</span>
                      )}

                      <div className={css.statusWrapper}>
                        <button
                          type="button"
                          className={`${css.statusButton} ${
                            openStatusId === application.applicationId
                              ? css.statusButtonOpen
                              : ''
                          }`}
                          onClick={() =>
                            setOpenStatusId(currentId =>
                              currentId === application.applicationId
                                ? null
                                : application.applicationId,
                            )
                          }
                          disabled={isStatusUpdating}
                          aria-expanded={
                            openStatusId === application.applicationId
                          }
                          aria-haspopup="listbox">
                          <span>{statusLabels[application.status]}</span>

                          {openStatusId === application.applicationId ? (
                            <KeyboardArrowUp
                              className={css.statusIcon}
                              aria-hidden="true"
                            />
                          ) : (
                            <KeyboardArrowDown
                              className={css.statusIcon}
                              aria-hidden="true"
                            />
                          )}
                        </button>

                        {openStatusId === application.applicationId && (
                          <div
                            className={css.statusMenu}
                            role="listbox"
                            aria-label={`Статус кандидата ${application.candidateName}`}>
                            {statusOptions.map(({ value, label }) => (
                              <button
                                key={value}
                                type="button"
                                role="option"
                                aria-selected={
                                  application.status === value ||
                                  (application.status === 'pending' &&
                                    value === 'reviewed')
                                }
                                className={`${css.statusOption} ${
                                  application.status === value ||
                                  (application.status === 'pending' &&
                                    value === 'reviewed')
                                    ? css.statusOptionActive
                                    : ''
                                }`}
                                onClick={() =>
                                  handleStatusChange(
                                    application.applicationId,
                                    value,
                                  )
                                }>
                                {label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {hasNextPage && (
            <button
              type="button"
              className={css.showMoreButton}
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}>
              {isFetchingNextPage ? 'Завантаження...' : 'Показати більше'}
            </button>
          )}
        </>
      ) : (
        <div className={css.empty}>
          <h3 className={css.emptyTitle}>
            На ваші вакансії ще ніхто не відгукнувся
          </h3>

          <p className={css.emptyText}>Почекайте і скоро все буде!</p>
        </div>
      )}
    </div>
  );
};

export default CandidatesList;
