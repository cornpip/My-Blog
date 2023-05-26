import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FileInfo } from '../../constants/_table.const';

/**
 * TableCell이  headrows 순서와 일치해야하기 때문에 object인 상태에서는 직접 지정이 나아보였다.
 * 그런데 이러면 BasicTable로 사용하지못하고 Filetable로 사용해야한다.
 * 
 * 그냥 Table을 사용하는 컴포넌트에서 array 순서에 규칙을 정하고 주는게 맞아보인다.
 * 다시 되돌리자.
 */

export default function BasicTable({ headrows, rows }: any) {
    // console.log(headrows)
    // console.log(rows)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headrows.length && headrows.map((head_row: string, i: number) => {
                            if (i == 0) return <TableCell key={head_row}>{head_row}</TableCell>
                            return <TableCell key={head_row} align='right'>{head_row}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map((row: FileInfo, i: number) => {
                            return (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell key={row.name} component="th" scope="row">{row.name}</TableCell>
                                    <TableCell key={row.type} align="right">{row.type}</TableCell>
                                    <TableCell key={row.size} align="right">{row.size}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

