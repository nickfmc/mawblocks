// components/SpacingControls.js
import { __ } from '@wordpress/i18n';
import { PanelBody, __experimentalBoxControl as BoxControl } from '@wordpress/components';

const SpacingControls = ({ attributes, setAttributes }) => {
    const { padding, margin } = attributes;

    // Define common units
    const units = [
        { value: 'px', label: 'px' },
        { value: '%', label: '%' },
        { value: 'em', label: 'em' },
        { value: 'rem', label: 'rem' },
    ];

    return (
        <PanelBody title={__('Spacing')} initialOpen={false}>
            {BoxControl ? (
                <>
                    <BoxControl
                        label={__('Padding')}
                        values={padding}
                        onChange={(newPadding) => setAttributes({ padding: newPadding })}
                        units={units}
                        allowReset={true}
                        splitOnAxis={false}
                    />

                    <BoxControl
                        label={__('Margin')}
                        values={margin}
                        onChange={(newMargin) => setAttributes({ margin: newMargin })}
                        units={units}
                        allowReset={true}
                        splitOnAxis={false}
                    />
                </>
            ) : (
                <div className="components-notice is-warning">
                    {__('BoxControl component is not available in your WordPress version. Please update to the latest version.')}
                </div>
            )}
        </PanelBody>
    );
};

export default SpacingControls;
