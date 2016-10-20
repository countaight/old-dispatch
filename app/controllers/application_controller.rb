class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  include SessionsHelper

  rescue_from CanCan::AccessDenied do |exception|
  	if current_user
  		redirect_to profile_path
  	else
  		redirect_to login_path
  	end
  end
end
