import React from "react";
import {Message} from "semantic-ui-react";
import {CustomError} from "../resources";

export const CustomErrorComponent = ({customError}: CustomErrorComponentProps) => {


    return <div>
        {customError && <Message error header={"Error"} content={customError?.message} />}
    </div>
}
type CustomErrorComponentProps = {
    customError: CustomError | undefined
}