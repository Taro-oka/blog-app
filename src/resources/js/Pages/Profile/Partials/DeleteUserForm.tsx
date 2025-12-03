import DangerButton from "@/Components/shared/DangerButton";
import InputError from "@/Components/shared/InputError";
import InputLabel from "@/Components/shared/InputLabel";
import Modal from "@/Components/shared/Modal";
import SecondaryButton from "@/Components/shared/SecondaryButton";
import TextInput from "@/Components/shared/TextInput";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef, useState } from "react";

export default function DeleteUserForm({ className = "" }: { className?: string }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">アカウント削除</h2>

                <p className="mt-1 text-sm text-gray-600">
                    アカウントを削除すると、すべてのデータが完全に削除されます。
                    必要なデータがあれば事前に保存してください。
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>アカウントを削除</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        本当にアカウントを削除しますか？
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        アカウントを削除すると、すべてのデータが完全に削除されます。
                        パスワードを入力して削除を確定してください。
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="パスワード" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="パスワード"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>キャンセル</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            アカウントを削除
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
