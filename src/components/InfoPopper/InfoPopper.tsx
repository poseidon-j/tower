import {
    createStyles,
    Paper,
    Popover,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import * as React from 'react';
import { capitalize } from '../../helpers';
import { DataInterface } from '../../modules';

const styles = (theme: Theme) => createStyles({
    popper: {
        minWidth: 150,
        padding: '10px 0px',
    },
    info: {
        padding: '8px 20px',
    },
    title: {
        opacity: 0.54,
    },
});

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

interface PopperProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    handleClose: () => void;
    data: DataInterface[];
}

type Props = StyleProps & PopperProps;

const PopperComponent: React.FunctionComponent<Props> = props => {
    const {
        anchorEl,
        open,
        handleClose,
        data,
        classes,
    } = props;

    const renderData = () => (
        data && data.length ?
            data.map((i: DataInterface, index: number) => {
                return (
                    <div key={index} className={classes.info}>
                        <Typography variant="body2" className={classes.title}>{capitalize(i.key)}</Typography>
                        <Typography variant="body1">{i.value}</Typography>
                    </div>
                );}) :
            <Typography variant="caption" align="center" >There is no data to show</Typography>
    );

    const id = open ? 'simple-popper' : undefined;

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            className={classes.popper}
        >
            <Paper>{renderData()}</Paper>
        </Popover>
        );
};

export const InfoPopper = withStyles(styles, { withTheme: true })(PopperComponent);
