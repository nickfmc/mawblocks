import { registerBlockType } from '@wordpress/blocks';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

registerBlockType('maw/blockthree', {
    title: 'Block Two',
    icon: 'format-image',
    category: 'common',
    attributes: {
        imageUrl: {
            type: 'string',
            default: '',
        },
        imageAlt: {
            type: 'string',
            default: '',
        },
    },
    edit: (props) => {
        const { attributes: { imageUrl, imageAlt }, setAttributes } = props;

        const onSelectImage = (media) => {
            setAttributes({
                imageUrl: media.url,
                imageAlt: media.alt,
            });
        };

        return (
            <div className={props.className}>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={onSelectImage}
                        allowedTypes={['image']}
                        render={({ open }) => (
                            <Button onClick={open}>
                                { imageUrl ? <img src={imageUrl} alt={imageAlt} /> : 'Upload Image' }
                            </Button>
                        )}
                    />
                </MediaUploadCheck>
            </div>
        );
    },
    save: (props) => {
        const { imageUrl, imageAlt } = props.attributes;
        return imageUrl ? <img src={imageUrl} alt={imageAlt} /> : null;
    },
});