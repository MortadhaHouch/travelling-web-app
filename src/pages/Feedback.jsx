export const Feedback = () => {
    return (
        <>
            <main className="d-flex justify-content-center align-items-center bg-dark-subtle">
                <form action="" method="post" className="d-flex flex-column justify-content-center align-items-center w-50">
                    <div className="mb-3 w-75 d-flex flex-column justify-content-start align-items-center">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control w-75"
                            name=""
                            id="email"
                            aria-describedby="emailHelpId"
                            placeholder="abc@mail.com" required
                        />
                    </div>
                    <div className="mb-3 w-75 h-75 d-flex flex-column justify-content-start align-items-center">
                            <label htmlFor="feedback" className="form-label">feedback</label>
                            <textarea className="form-control w-75 h-100" name="" id="feedback" rows="3" required></textarea>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Submit
                    </button>
                    
                </form>
            </main>
        </>
    )
}
