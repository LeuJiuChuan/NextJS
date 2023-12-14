"use server";

import * as auth from "@/auth";

import React from "react";

export async function signIn() {
  return auth.signIn('github');
}

export async function signOut() {
    return auth.signOut();
  }
  
