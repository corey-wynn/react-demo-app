import { useState } from "react";
import { createUseStyles } from "react-jss";

export interface AvatarProps {
    size: number;
    altText?: string;
    image: string;
    name?: string;
}

export default function AvatarComponent(props: AvatarProps) {
    const classes = styles();
    const [useFallback, setUseFallback] = useState<boolean>(false);
    const { image, size, altText, name } = props;

    const renderFallback = () => {
        const letters: string[] = (name || altText).match(/\b(\w)/g);
        const acronym: string = letters.join('');
        return (
            <div className={classes.fallBack} style={{ width: size, height: size }}>
                <p className={classes.fallBackText}>{acronym}</p>
            </div>
        );
    }

    return (
        <div className={classes.avatarAndName} style={{ height: size }}>
            <div style={{ width: size }}>
                {!useFallback && image &&
                    <img
                        className={classes.image}
                        src={image}
                        alt={altText}
                        onError={() => setUseFallback(true)}
                    />
                }

                {(useFallback || !image) && renderFallback()}
            </div>

            {name && 
                <div className={classes.name}>
                    <p>{name}</p>
                </div>
            }
        </div>
    );
}

const styles = createUseStyles({
    avatarAndName: {
        display: 'flex',
        alignItems: 'center'
    },
    image: {
        borderRadius: '50%',
        border: '1px solid #e9e9e9',
        background: '#e9e9e9'
    },
    name: {
        fontSize: '18px',
        marginLeft: '10px'
    },
    fallBack: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        border: '1px solid #2b2e33',
        background: '#e9e9e9'
    },
    fallBackText: {
        fontSize: '28px',
        fontWeight: 600,
        textTransform: 'uppercase'
    }
})