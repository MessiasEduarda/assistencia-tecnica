'use client';
import React, { useState, useMemo } from 'react';
import {
  Container, TableWrap, StyledTable, Th, Td, TBody,
  EmptyState, LoadingState, Spinner, LoadingRow,
  PaginationWrapper, PaginationInfo, PaginationControls,
  PageButton, PageEllipsis, PaginationArrow,
} from './styles';

export interface Column<T> {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (row: T, index: number) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  loading?: boolean;
  emptyIcon?: React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  perPage?: number;
  onRowClick?: (row: T) => void;
}

const IconEmpty = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="13" y2="17" />
  </svg>
);

export function Table<T>({
  columns,
  data,
  rowKey,
  loading = false,
  emptyIcon,
  emptyTitle = 'Nenhum dado encontrado',
  emptyDescription = '',
  perPage = 10,
  onRowClick,
}: TableProps<T>) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(data.length / perPage));

  React.useEffect(() => { setPage(1); }, [data.length]);

  const pageData = useMemo(() => {
    const start = (page - 1) * perPage;
    return data.slice(start, start + perPage);
  }, [data, page, perPage]);

  // to = total acumulado até o fim desta página
  // pg1 com 50 total = 10 | pg2 = 20 | última pg com 11 total = 11
  const to = Math.min(page * perPage, data.length);

  function getVisiblePages(): (number | '...')[] {
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | '...')[] = [];
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(2, page - half);
    let end = Math.min(totalPages - 1, page + half);
    if (page <= half + 1) end = Math.min(totalPages - 1, maxVisible - 1);
    if (page >= totalPages - half) start = Math.max(2, totalPages - maxVisible + 2);
    pages.push(1);
    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  }

  const resolvedIcon = emptyIcon ?? <IconEmpty />;

  return (
    <Container>
      <TableWrap>
        <StyledTable>
          <thead>
            <tr>
              {columns.map(col => (
                <Th key={col.key} style={{ width: col.width, textAlign: col.align ?? 'left' }}>
                  {col.label}
                </Th>
              ))}
            </tr>
          </thead>
          <TBody $clickable={!!onRowClick}>
            {loading ? (
              <tr>
                <td colSpan={columns.length}>
                  <LoadingState>
                    <LoadingRow><Spinner />Carregando...</LoadingRow>
                  </LoadingState>
                </td>
              </tr>
            ) : pageData.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <EmptyState>
                    <div className="icon">{resolvedIcon}</div>
                    <strong>{emptyTitle}</strong>
                    {emptyDescription && <p>{emptyDescription}</p>}
                  </EmptyState>
                </td>
              </tr>
            ) : (
              pageData.map((row, i) => (
                <tr key={rowKey(row)} onClick={() => onRowClick?.(row)}>
                  {columns.map(col => (
                    <Td key={col.key} style={{ textAlign: col.align ?? 'left' }}>
                      {col.render ? col.render(row, i) : (row as any)[col.key]}
                    </Td>
                  ))}
                </tr>
              ))
            )}
          </TBody>
        </StyledTable>
      </TableWrap>

      <PaginationWrapper>
        <PaginationInfo>
          {data.length === 0
            ? 'Nenhum registro'
            : `Mostrando ${to} de ${data.length}`}
        </PaginationInfo>
        <PaginationControls>
          <PaginationArrow
            onClick={() => setPage(p => p - 1)}
            disabled={page <= 1}
            aria-label="Página anterior"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </PaginationArrow>

          {getVisiblePages().map((p, idx) =>
            p === '...' ? (
              <PageEllipsis key={`e-${idx}`}>…</PageEllipsis>
            ) : (
              <PageButton
                key={p}
                $active={p === page}
                onClick={() => setPage(p as number)}
                aria-label={`Página ${p}`}
                aria-current={p === page ? 'page' : undefined}
              >
                {p}
              </PageButton>
            )
          )}

          <PaginationArrow
            onClick={() => setPage(p => p + 1)}
            disabled={page >= totalPages}
            aria-label="Próxima página"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </PaginationArrow>
        </PaginationControls>
      </PaginationWrapper>
    </Container>
  );
}