export namespace FormHelper {
    export function getJoiErrors(schema: any, values: any) {
        const validation = schema.validate(values, {abortEarly: false});
        const keys = Object.keys(validation.value);
        const errors: any = {};

        for (const key of keys) {
            const detail = validation.error?.details.find((detail: any) => {
                return detail.path.indexOf(key) !== -1;
            });

            errors[key] = detail ? detail.message : null;
        }

        return errors;
    }

    export function getServerErrors(errors: any, serverErrors: any) {
        const keys = Object.keys(serverErrors);
        const copy = {...errors};

        for (const key of keys) {
            copy[key] = serverErrors[key].join(" ");
        }

        return copy;
    }
}

