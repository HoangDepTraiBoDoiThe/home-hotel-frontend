import React, {useMemo} from 'react'

type Props = {
    currentPage: number,
    totalPages: number,
    onChange: (page: number) => void,
}

const RoomPaginator: React.FC<Props> = (props: Props) => {
    const pageCount = useMemo(() => {
        return Array.from({ length: props.totalPages }, (_, i) => i + 1)
    }, [props.totalPages]);

  return (
      <div>{pageCount}</div>
  )
}

export default RoomPaginator