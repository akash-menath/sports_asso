import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SlideOverProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    width?: string;
}

export default function SlideOver({ isOpen, onClose, children, width = "max-w-[450px]" }: SlideOverProps) {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                {/* Background overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/20 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-300 sm:duration-400"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-300 sm:duration-400"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className={`pointer-events-auto w-screen ${width}`}>
                                    <div className="flex h-full flex-col overflow-y-auto bg-white shadow-2xl relative">
                                        {/* Close button top right */}
                                        <div className="absolute top-4 right-4 z-10">
                                            <button
                                                type="button"
                                                className="rounded-md bg-transparent text-[#666] hover:text-[#333] focus:outline-none focus:ring-opacity-50"
                                                onClick={onClose}
                                            >
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon className="h-[22px] w-[22px] stroke-[1.5]" aria-hidden="true" />
                                            </button>
                                        </div>

                                        {/* Content */}
                                        <div className="relative flex-1 pt-12 pb-6 px-8 flex flex-col">
                                            {children}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
