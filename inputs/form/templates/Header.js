import styles from "../styles/Form.module.css";
import {ArrowBackRounded} from "@material-ui/icons";
import React from "react";
import PropTypes from "prop-types";
import Button from "../../button/Button";
import EntityLayoutPT from "../locales/EntityLayoutPT";

export default function Header(props) {
    const lang = EntityLayoutPT

    return (
        <div className={styles.header} style={{boxShadow: props.scrolled ? undefined : 'none'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div className={styles.headerContent}>
                    <Button className={styles.buttonContainer} color={'secondary'}
                            styles={{display: props.returnButton ? undefined : 'none'}}
                            onClick={() => props.handleClose()}>
                        <ArrowBackRounded/>
                    </Button>
                    {props.title}
                </div>

                <div className={styles.headerContent}>
                    <Button
                        className={styles.submitButton} disabled={props.disabled}
                        variant={'filled'}
                        onClick={() => props.handleSubmit(props.hook.data, props.hook.clearState)}>
                        {props.submitLabel ? props.submitLabel : (props.create ? lang.create : lang.save)}
                    </Button>
                </div>
            </div>
            <div className={styles.buttons}>
                {props.options?.map((b, index) => (
                    <React.Fragment key={index + '-option-button'}>
                        <div className={styles.divider} style={{display: index === 0 ? 'none' : undefined}}/>
                        <Button
                            align={'bottom'} variant={'minimal'}
                            className={styles.buttonContainer}
                            disabled={b.disabled}
                            onClick={b.onClick}
                        >
                            {b.icon}
                            {b.label}
                        </Button>
                    </React.Fragment>

                ))}
            </div>
        </div>
    )
}

Header.propTypes = {
    scrolled: PropTypes.bool,

    disabled: PropTypes.bool,
    returnButton: PropTypes.bool,
    title: PropTypes.string,
    hook: PropTypes.object.isRequired,
    create: PropTypes.bool,
    dependencies: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.oneOf(['string', 'number', 'object', 'bool', 'date', 'array'])
    })),
    handleSubmit: PropTypes.func.isRequired,
    metadata: PropTypes.shape({
        lastModified: PropTypes.any,
        creator: PropTypes.any,
    }),
    handleClose: PropTypes.func,
    submitLabel: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.any, label: PropTypes.string, onClick: PropTypes.func,
        disabled: PropTypes.bool
    }))
}
