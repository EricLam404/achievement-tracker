"use client";

import React from "react";
import { useRouter } from "next/navigation";

function Back() {
    const router = useRouter();
    function handleBack() {
        router.back();
    }

    return (
        <button className="btn" onClick={handleBack}>
            Go Back
        </button>
    );
}

export default Back;
